import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ThemeToggle from '@/components/ThemeToggle';
import { db } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  query, 
  where,
  orderBy,
  getDoc,
  Timestamp,
  deleteDoc
} from 'firebase/firestore';

// Define interfaces for type safety
interface Registration {
  id: string;
  name?: string;
  age?: string;
  parentEmail?: string;
  parentPhone?: string;
  info?: string;
  referral?: string;
  paid?: boolean;
  createdAt?: Timestamp;
}

interface ReferralInfo {
  name?: string;
  email?: string;
  phone?: string;
  isUnder18?: boolean;
  parentName?: string;
  parentEmail?: string;
  parentPhone?: string;
  code?: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPaid, setFilterPaid] = useState<boolean | null>(null);
  const [referralDetails, setReferralDetails] = useState<Record<string, ReferralInfo>>({});

  // Authentication - simple password protection
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, use proper auth. This is just for demo
    if (password === 'Baikasnamas2') {
      setIsAuthenticated(true);
      localStorage.setItem('dashboard_auth', 'true');
      fetchRegistrations();
    } else {
      alert('Neteisingas slaptažodis!');
    }
  };

  // Check if user is already authenticated
  useEffect(() => {
    if (localStorage.getItem('dashboard_auth') === 'true') {
      setIsAuthenticated(true);
      fetchRegistrations();
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch all registrations
  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "registrations"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const registrationsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Registration[];
      
      setRegistrations(registrationsData);
      
      // Get referral details for each unique referral code
      const uniqueReferrals = [...new Set(registrationsData
        .filter(reg => reg.referral)
        .map(reg => reg.referral))];
      
      const referralData: Record<string, ReferralInfo> = {};
      for (const refCode of uniqueReferrals) {
        if (refCode) { // Make sure refCode is not undefined
          const refQuery = query(
            collection(db, "referrals"),
            where("code", "==", refCode)
          );
          const refSnapshot = await getDocs(refQuery);
          if (!refSnapshot.empty) {
            referralData[refCode] = refSnapshot.docs[0].data() as ReferralInfo;
          }
        }
      }
      
      setReferralDetails(referralData);
    } catch (error) {
      console.error("Error fetching registrations: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Update payment status
  const togglePaymentStatus = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, "registrations", id), {
        paid: !currentStatus
      });
      // Update local state
      setRegistrations(registrations.map(reg => 
        reg.id === id ? {...reg, paid: !currentStatus} : reg
      ));
    } catch (error) {
      console.error("Error updating payment status: ", error);
    }
  };

  // Filter registrations based on search and payment status
  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = 
      searchTerm === '' || 
      reg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.parentEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (reg.referral && reg.referral.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesPaidFilter = 
      filterPaid === null || 
      reg.paid === filterPaid;
    
    return matchesSearch && matchesPaidFilter;
  });

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('dashboard_auth');
    setIsAuthenticated(false);
  };

  // Delete registration
  const deleteRegistration = async (id: string) => {
    if (window.confirm('Ar tikrai norite ištrinti šią registraciją? Šio veiksmo nebus galima atšaukti.')) {
      try {
        await deleteDoc(doc(db, "registrations", id));
        // Update local state
        setRegistrations(registrations.filter(reg => reg.id !== id));
      } catch (error) {
        console.error("Klaida trinant registraciją: ", error);
        alert('Nepavyko ištrinti registracijos. Bandykite dar kartą.');
      }
    }
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="ai-container py-16 flex justify-center">
        <Card className="p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <Label htmlFor="password">Slaptažodis</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <Button type="submit" className="w-full">Prisijungti</Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="ai-container py-8">
      <div className="flex justify-between flex-wrap gap-5 items-center mb-6">
        <h1 className="text-3xl font-bold">Registracijų valdymo panelė</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button onClick={handleLogout} variant="outline">Atsijungti</Button>
        </div>
      </div>
      
      <Card className="p-6 mb-6">
        <div className="text-muted-foreground mb-4">
          <p>Sveiki atvykę į administravimo pultą! Čia galite:</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Peržiūrėti visus registruotus dalyvius</li>
            <li>Sekti apmokėjimo statusą (pažymėti kaip apmokėta)</li>
            <li>Matyti referalų informaciją (kas pakvietė dalyvį)</li>
            <li>Ieškoti ir filtruoti informaciją</li>
          </ul>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="search">Paieška</Label>
            <Input 
              id="search" 
              placeholder="Ieškoti pagal vardą, el. paštą ar kodą" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <Label>Filtruoti pagal apmokėjimą</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              <Button 
                variant={filterPaid === null ? "default" : "outline"}
                onClick={() => setFilterPaid(null)}
                className="flex-1 min-w-[80px] px-0"
                size="sm"
              >
                Visi
              </Button>
              <Button 
                variant={filterPaid === true ? "default" : "outline"}
                onClick={() => setFilterPaid(true)}
                className="flex-1 min-w-[80px] px-5"
                size="sm"
              >
                Apmokėta
              </Button>
              <Button 
                variant={filterPaid === false ? "default" : "outline"}
                onClick={() => setFilterPaid(false)}
                className="flex-1 min-w-[80px] px-10"
                size="sm"
              >
                Neapmokėta
              </Button>
            </div>
          </div>
          
          <div className="flex items-end">
            <Button onClick={fetchRegistrations} className="w-full">Atnaujinti duomenis</Button>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          Rasta rezultatų: {filteredRegistrations.length} iš {registrations.length}
        </div>
      </Card>
      
      {loading ? (
        <div className="text-center py-12">Įkeliama...</div>
      ) : (
        <>
          <div className="grid gap-4">
            {filteredRegistrations.length === 0 ? (
              <Card className="p-6 text-center">
                Nerasta jokių registracijų
              </Card>
            ) : (
              filteredRegistrations.map((registration) => (
                <Card key={registration.id} className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-xl font-bold mb-2">{registration.name || 'Be vardo'}</h3>
                      </div>
                      <div className="space-y-1 mb-4">
                        <div><strong>Amžius:</strong> {registration.age}</div>
                        <div><strong>Tėvų el. paštas:</strong> {registration.parentEmail}</div>
                        <div><strong>Tėvų tel. nr.:</strong> {registration.parentPhone}</div>
                        {registration.info && (
                          <div><strong>Papildoma informacija:</strong> {registration.info}</div>
                        )}
                        <div><strong>Užsiregistruota:</strong> {registration.createdAt?.toDate().toLocaleString('lt-LT') || 'Nėra datos'}</div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={`paid-${registration.id}`}
                            checked={registration.paid || false}
                            onCheckedChange={() => togglePaymentStatus(registration.id, registration.paid || false)}
                          />
                          <Label htmlFor={`paid-${registration.id}`} className="font-bold">
                            {registration.paid ? 'Apmokėta' : 'Neapmokėta'}
                          </Label>
                        </div>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => deleteRegistration(registration.id)}
                        >
                          Ištrinti
                        </Button>
                      </div>
                    </div>
                    
                    {registration.referral && (
                      <div className="bg-muted p-3 sm:p-4 rounded-lg">
                        <h4 className="font-bold mb-2">Referalo informacija</h4>
                        <div><strong>Kodas:</strong> {registration.referral}</div>
                        
                        {referralDetails[registration.referral] ? (
                          <div className="mt-2">
                            <div><strong>Referalo savininkas:</strong> {referralDetails[registration.referral].name}</div>
                            <div><strong>El. paštas:</strong> {referralDetails[registration.referral].email}</div>
                            <div><strong>Tel. nr.:</strong> {referralDetails[registration.referral].phone}</div>
                            
                            {referralDetails[registration.referral].isUnder18 && (
                              <div className="mt-2">
                                <div><strong>Tėvų vardas:</strong> {referralDetails[registration.referral].parentName}</div>
                                <div><strong>Tėvų el. paštas:</strong> {referralDetails[registration.referral].parentEmail}</div>
                                <div><strong>Tėvų tel. nr.:</strong> {referralDetails[registration.referral].parentPhone}</div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-yellow-500 mt-2">Referalo informacija nerasta</div>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard; 