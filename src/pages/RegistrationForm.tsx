import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import ThemeToggle from '@/components/ThemeToggle';
import { ArrowLeft } from 'lucide-react';

const RegistrationForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    age: '',
    parentEmail: '',
    parentPhone: '',
    info: '',
    referral: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [referralInfo, setReferralInfo] = useState<{name?: string} | null>(null);
  const [referralLoading, setReferralLoading] = useState(false);
  const [hasUrlReferral, setHasUrlReferral] = useState(false);

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      setForm((f) => ({ ...f, referral: ref }));
      setHasUrlReferral(true);
      fetchReferralInfo(ref);
    }
  }, [searchParams]);

  const goBack = () => {
    navigate(-1);
  };

  // Fetch referral owner info for display
  const fetchReferralInfo = async (refCode: string) => {
    if (!refCode) return;
    
    setReferralLoading(true);
    try {
      const q = query(collection(db, "referrals"), where("code", "==", refCode));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        setReferralInfo({
          name: data.name || 'Nežinomas'
        });
      } else {
        setReferralInfo(null);
      }
    } catch (error) {
      console.error("Error fetching referral info:", error);
      setReferralInfo(null);
    } finally {
      setReferralLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Check referral code when it's manually entered
    if (name === 'referral' && value && !hasUrlReferral) {
      fetchReferralInfo(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://europe-central2-build-with-ai-e0c41.cloudfunctions.net/registerUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Nepavyko išsiųsti duomenų. Bandykite dar kartą.');
      }
    } catch (err) {
      alert('Nepavyko išsiųsti duomenų. Bandykite dar kartą.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="ai-container py-12">
        <div className="max-w-lg mx-auto">
          {/* Back button and theme toggle at the top */}
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
          
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <h2 className="text-3xl font-bold mb-4">Ačiū už registraciją!</h2>
            <p className="text-lg">Netrukus susisieksime su Jumis dėl detalių.</p>
          </div>
          
          {/* Theme toggle at the bottom */}
          <div className="flex justify-center mt-8">
            <ThemeToggle />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-container py-12">
      <div className="max-w-lg mx-auto">
        {/* Back button and theme toggle at the top */}
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
        
        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Registracijos forma į kursus</h1>
          
          {form.referral && (
            <div className="mb-6">
              {referralLoading ? (
                <div className="text-center py-2">Tikrinama referalo informacija...</div>
              ) : referralInfo ? (
                <Alert>
                  <AlertDescription>
                    Jūs registruojatės naudodami <strong>{referralInfo.name}</strong> referalo kodą.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert>
                  <AlertDescription>
                    Jūs registruojatės naudodami <strong>{form.referral}</strong> referalo kodą.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name">Vardas *</Label>
              <Input id="name" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="age">Kiek metų? *</Label>
              <Input id="age" name="age" value={form.age} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="parentEmail">Tėvų/globėjų paštas *</Label>
              <Input id="parentEmail" name="parentEmail" type="email" value={form.parentEmail} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="parentPhone">Tėvų/globėjų telefono numeris *</Label>
              <Input id="parentPhone" name="parentPhone" type="tel" value={form.parentPhone} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="info">Papildoma informacija apie mokinį</Label>
              <Textarea id="info" name="info" value={form.info} onChange={handleChange} rows={3} />
            </div>
            <div>
              <Label htmlFor="referral">Referalo kodas</Label>
              <Input 
                id="referral" 
                name="referral" 
                value={form.referral} 
                onChange={handleChange}
                readOnly={hasUrlReferral} 
                className={hasUrlReferral ? "bg-gray-100" : ""}
                placeholder={hasUrlReferral ? "" : "Įveskite referalo kodą (neprivaloma)"}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Siunčiama...' : 'Registruotis'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationForm; 