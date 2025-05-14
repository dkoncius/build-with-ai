import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { ArrowLeft } from "lucide-react";

const LOCAL_REFERRAL_KEY = 'referral_by_email';

function saveReferralToLocal(email: string, code: string, link: string) {
  if (!email) return;
  const data = { code, link };
  const all = JSON.parse(localStorage.getItem(LOCAL_REFERRAL_KEY) || '{}');
  all[email.toLowerCase()] = data;
  localStorage.setItem(LOCAL_REFERRAL_KEY, JSON.stringify(all));
}

function getReferralFromLocal(email: string): { code: string; link: string } | null {
  if (!email) return null;
  const all = JSON.parse(localStorage.getItem(LOCAL_REFERRAL_KEY) || '{}');
  return all[email.toLowerCase()] || null;
}

const Partners = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [isUnder18, setIsUnder18] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [referralLink, setReferralLink] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // For instant check on registration email
  const [existingReferral, setExistingReferral] = useState<{ code: string; link: string } | null>(null);
  const [checkingReferral, setCheckingReferral] = useState(false);

  // Referral statistics
  const [refStats, setRefStats] = useState<{ name: string; paid?: boolean }[]>([]);
  const [statsLoading, setStatsLoading] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check localStorage and Firebase for referral on email input change
  useEffect(() => {
    let ignore = false;
    async function checkReferral(emailToCheck: string) {
      setCheckingReferral(true);
      // 1. Check localStorage
      const foundLocal = getReferralFromLocal(emailToCheck);
      if (foundLocal) {
        setExistingReferral(foundLocal);
        setCheckingReferral(false);
        return;
      }
      // 2. Check Firebase
      try {
        const q = query(collection(db, "referrals"), where("email", "==", emailToCheck.toLowerCase()));
        const snap = await getDocs(q);
        if (!ignore && !snap.empty) {
          const doc = snap.docs[0].data();
          const code = doc.code;
          const link = `${window.location.origin}/?ref=${code}`;
          setExistingReferral({ code, link });
          // Save to localStorage for next time
          saveReferralToLocal(emailToCheck, code, link);
        } else if (!ignore) {
          setExistingReferral(null);
        }
      } catch (err) {
        if (!ignore) setExistingReferral(null);
      } finally {
        if (!ignore) setCheckingReferral(false);
      }
    }
    if (email) {
      checkReferral(email);
    } else {
      setExistingReferral(null);
    }
    return () => { ignore = true; };
  }, [email]);

  // Fetch referral statistics when referral code is available
  useEffect(() => {
    if (!existingReferral?.code) {
      setRefStats([]);
      return;
    }
    setStatsLoading(true);
    const q = query(collection(db, "registrations"), where("referral", "==", existingReferral.code));
    getDocs(q).then((snap) => {
      setRefStats(snap.docs.map((doc) => ({
        name: doc.data().name || '',
        paid: doc.data().paid || false,
      })));
      setStatsLoading(false);
    });
  }, [existingReferral?.code]);

  // Function to generate unique referral code
  const generateReferralCode = () => {
    const code = nanoid(8).toUpperCase();
    setReferralCode(code);
    const link = `${window.location.origin}/?ref=${code}`;
    setReferralLink(link);
    return code;
  };

  const goBack = () => {
    navigate(-1);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Generate a new code
      const code = generateReferralCode();

      // Save data to Firebase
      const referralData = {
        code,
        name,
        email,
        phone,
        isUnder18,
        parentName: isUnder18 ? parentName : "",
        parentEmail: isUnder18 ? parentEmail : "",
        parentPhone: isUnder18 ? parentPhone : "",
        signups: 0,
        reward: "",
        rewardClaimed: false,
        createdAt: serverTimestamp()
      };

      // Add the document to the 'referrals' collection
      await addDoc(collection(db, "referrals"), referralData);

      // Save to localStorage
      saveReferralToLocal(email, code, `${window.location.origin}/?ref=${code}`);

      setIsSubmitted(true);
      toast({
        title: "Registracija sėkminga!",
        description: "Jūsų unikalus kodas sukurtas ir išsaugotas.",
      });
    } catch (error) {
      console.error("Error saving referral: ", error);
      toast({
        title: "Klaida!",
        description: "Nepavyko sukurti referalo kodo. Bandykite dar kartą vėliau.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Copy referral link to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Nukopijuota!",
      description: "Nuoroda nukopijuota į iškarpinę.",
    });
  };

  return (
    <div className="ai-container py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={goBack} 
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Grįžti atgal</span>
          </button>
          <ThemeToggle />
        </div>
      
        <h1 className="text-4xl font-bold mb-8 text-center">Partnerių programa</h1>
        
        <Card className="p-6 mb-10">
          <h2 className="text-2xl font-bold mb-4">Pasidalink "Build with AI" kursais moksleiviams</h2>
          <p className="mb-6">
            Pasidalink "Build with AI" kursais moksleiviams su savo draugais ar kolegomis – ir gauk padėką, kuri verta dėmesio.
          </p>
          
          <div className="bg-muted p-4 rounded-lg mb-6">
            <h3 className="font-bold text-xl mb-3">Ką siūlome:</h3>
            <p className="mb-2">Už kiekvienus 2 žmones, kurie užsiregistruos ir apmokės kursą naudodami Tavo asmeninę nuorodą ar referalo kodą, galėsi pasirinkti vieną iš šių dovanų:</p>
            <ul className="mb-4 space-y-2">
              <li className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mr-2">1</div>
                <span><strong>50 € piniginis atlygis</strong></span>
              </li>
              <li className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mr-2">2</div>
                <span><strong>Nemokamas Build with AI kursas moksleiviams</strong></span>
              </li>
            </ul>
          </div>
          
          <h3 className="font-bold text-xl mb-3">Kaip tai veikia:</h3>
          <ol className="list-decimal list-inside mb-6 space-y-2">
            <li>Užsiregistruok žemiau pateiktoje formoje</li>
            <li>Gauk savo <strong>unikalią nuorodą</strong> ir <strong>kodą</strong></li>
            <li>Pasidalink – kai du žmonės užsiregistruos, informuosime Tave apie dovaną</li>
          </ol>
          
          <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg mb-6">
            <h3 className="font-bold mb-2">Jaunesni nei 18 metų:</h3>
            <p>Prašome nurodyti vieno iš tėvų ar globėjų kontaktus – su jais derinsime prizų perdavimą.</p>
          </div>
          
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Privatumo užtikrinimas:</h3>
            <p>Jūsų pateikti kontaktai naudojami tik šios programos tikslams ir nėra perduodami tretiesiems asmenims.</p>
          </div>
        </Card>

        {/* Jei jau yra referral pagal el. paštą, rodyk tik kodą ir nuorodą */}
        {checkingReferral ? (
          <div className="flex justify-center items-center py-12"><span className="text-gray-500">Tikrinama...</span></div>
        ) : existingReferral ? (
          <Card className="p-6 mb-10">
            <h2 className="text-2xl font-bold mb-6">Jūsų referalo informacija</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="referralCode">Jūsų unikalus kodas</Label>
                <div className="flex mt-2">
                  <Input 
                    id="referralCode" 
                    value={existingReferral.code} 
                    readOnly 
                    className="text-center font-bold text-xl"
                  />
                  <Button 
                    onClick={() => copyToClipboard(existingReferral.code)}
                    className="ml-2"
                  >
                    Kopijuoti
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="referralLink">Jūsų unikali nuoroda</Label>
                <div className="flex mt-2">
                  <Input 
                    id="referralLink" 
                    value={existingReferral.link} 
                    readOnly
                  />
                  <Button 
                    onClick={() => copyToClipboard(existingReferral.link)}
                    className="ml-2"
                  >
                    Kopijuoti
                  </Button>
                </div>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Kas toliau?</h3>
                <p>Pasidalinkite šiuo kodu ar nuoroda su draugais. Kai 2 žmonės užsiregistruos naudodami Jūsų kodą ar nuorodą, susisieksime su Jumis dėl atlygio.</p>
              </div>

              {/* Referral statistics */}
              <div className="mt-8">
                <h3 className="font-bold text-lg mb-2">Jūsų referalo statistika</h3>
                {statsLoading ? (
                  <div>Įkeliama...</div>
                ) : refStats.length === 0 ? (
                  <div>Dar niekas neužsiregistravo su jūsų kodu.</div>
                ) : (
                  <ul className="divide-y divide-muted">
                    {refStats.map((reg, i) => (
                      <li key={i} className="py-2 flex items-center justify-between">
                        <span>{reg.name || 'Be vardo'}</span>
                        <span className={reg.paid ? 'text-green-600 font-semibold' : 'text-yellow-600'}>
                          {reg.paid ? 'Apmokėta' : 'Neapmokėta'}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

            </div>
          </Card>
        ) : !isSubmitted ? (
          <Card className="p-6 mb-10">
            <h2 className="text-2xl font-bold mb-6">Registracija į partnerių programą</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox 
                    id="under18" 
                    checked={isUnder18} 
                    onCheckedChange={(checked) => setIsUnder18(checked === true)} 
                  />
                  <Label htmlFor="under18">Esu jaunesnis(-ė) nei 18 metų</Label>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="name">Vardas Pavardė *</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">El. paštas *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Telefono numeris *</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    required
                  />
                </div>
              </div>
              
              {isUnder18 && (
                <div className="space-y-4 mb-6 border-t pt-4">
                  <h3 className="font-bold mb-2">Tėvų/Globėjų kontaktai</h3>
                  <div>
                    <Label htmlFor="parentName">Tėvų/Globėjų vardas pavardė *</Label>
                    <Input 
                      id="parentName" 
                      value={parentName} 
                      onChange={(e) => setParentName(e.target.value)} 
                      required={isUnder18} 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="parentEmail">Tėvų/Globėjų el. paštas *</Label>
                    <Input 
                      id="parentEmail" 
                      type="email" 
                      value={parentEmail} 
                      onChange={(e) => setParentEmail(e.target.value)} 
                      required={isUnder18} 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="parentPhone">Tėvų/Globėjų telefono numeris *</Label>
                    <Input 
                      id="parentPhone" 
                      type="tel" 
                      value={parentPhone} 
                      onChange={(e) => setParentPhone(e.target.value)} 
                      required={isUnder18}
                    />
                  </div>
                </div>
              )}
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Siunčiama..." : "Gauti referalo kodą"}
              </Button>
            </form>
          </Card>
        ) : (
          <Card className="p-6 mb-10">
            <h2 className="text-2xl font-bold mb-6">Jūsų referalo informacija</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="referralCode">Jūsų unikalus kodas</Label>
                <div className="flex mt-2">
                  <Input 
                    id="referralCode" 
                    value={referralCode} 
                    readOnly 
                    className="text-center font-bold text-xl"
                  />
                  <Button 
                    onClick={() => copyToClipboard(referralCode)}
                    className="ml-2"
                  >
                    Kopijuoti
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="referralLink">Jūsų unikali nuoroda</Label>
                <div className="flex mt-2">
                  <Input 
                    id="referralLink" 
                    value={referralLink} 
                    readOnly
                  />
                  <Button 
                    onClick={() => copyToClipboard(referralLink)}
                    className="ml-2"
                  >
                    Kopijuoti
                  </Button>
                </div>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Kas toliau?</h3>
                <p>Pasidalinkite šiuo kodu ar nuoroda su draugais. Kai 2 žmonės užsiregistruos naudodami Jūsų kodą ar nuorodą, susisieksime su Jumis dėl atlygio.</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Partners; 