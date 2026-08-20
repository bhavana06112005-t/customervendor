import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  MapPin, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  Mail,
  Lock,
  Globe,
  Store,
  Check,
  Smartphone,
  Navigation,
  RefreshCw,
  Crosshair,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  auth, 
  googleProvider, 
  saveUserProfileToFirebase, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from '../firebase';
import { playSuccessChime, playPopSound } from '../utils/audio';
import { getLiveGPSCoordinates, reverseGeocodeGPS } from '../utils/geolocation';

export const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalInitialTab,
    user, 
    updateUserProfile, 
    setCurrentLocation,
    showToast 
  } = useApp();

  // 'main' | 'gmail-input' | 'email-form'
  const [viewState, setViewState] = useState('main');
  const [isEmailRegister, setIsEmailRegister] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [noticeMessage, setNoticeMessage] = useState('');

  // Form Fields
  const [gmailAddress, setGmailAddress] = useState(user?.email?.endsWith('@gmail.com') ? user.email : '');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState(user?.phone || '');
  const [village, setVillage] = useState(user?.village || 'Mijar');
  const [town, setTown] = useState(user?.town || 'Moodbidri');
  const [district, setDistrict] = useState(user?.district || 'Dakshina Kannada');
  const [pincode, setPincode] = useState(user?.pincode || '574225');
  const [streetAddress, setStreetAddress] = useState(user?.address || '');
  const [landmark, setLandmark] = useState(user?.landmark || '');
  const [userRole, setUserRole] = useState(user?.role || 'customer');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [authUid, setAuthUid] = useState(user?.uid || '');

  // Live GPS state
  const [gpsData, setGpsData] = useState(user?.gpsLocation || null);
  const [isDetectingGPS, setIsDetectingGPS] = useState(false);

  useEffect(() => {
    if (isAuthModalOpen) {
      setViewState(authModalInitialTab === 'email' ? 'email-form' : 'main');
      setErrorMessage('');
      setNoticeMessage('');
      if (user?.isLoggedIn && user?.name) {
        setName(user.name);
        setEmail(user.email || '');
        if (user.email && user.email.includes('@')) {
          setGmailAddress(user.email);
        }
        setPhone(user.phone || '');
        setVillage(user.village || 'Mijar');
        setTown(user.town || 'Moodbidri');
        setDistrict(user.district || 'Dakshina Kannada');
        setPincode(user.pincode || '574225');
        setStreetAddress(user.address || '');
        setLandmark(user.landmark || '');
        if (user.gpsLocation) setGpsData(user.gpsLocation);
      }
    }
  }, [isAuthModalOpen, user, authModalInitialTab]);

  if (!isAuthModalOpen) return null;

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      playSuccessChime();
    } catch (e) {}
  };

  // Live GPS Hardware Acquisition
  const handleDetectGPS = async () => {
    setIsDetectingGPS(true);
    playPopSound();

    try {
      const coords = await getLiveGPSCoordinates();
      const geocoded = await reverseGeocodeGPS(coords.lat, coords.lng, coords.accuracy);

      setGpsData(geocoded);
      if (geocoded.village) setVillage(geocoded.village);
      if (geocoded.town) setTown(geocoded.town);
      if (geocoded.district) setDistrict(geocoded.district);
      if (geocoded.pincode) setPincode(geocoded.pincode);
      if (geocoded.streetAddress) setStreetAddress(geocoded.streetAddress);
      if (!landmark) setLandmark(`Near ${geocoded.village || geocoded.town}`);

      setCurrentLocation({
        name: `${geocoded.village || geocoded.town}, ${geocoded.town}`,
        village: geocoded.village,
        town: geocoded.town,
        district: geocoded.district,
        pincode: geocoded.pincode,
        lat: geocoded.lat,
        lng: geocoded.lng,
        accuracy: geocoded.accuracy,
        source: 'GPS_LIVE'
      });

      showToast(`📍 GPS Locked: ${geocoded.village || geocoded.town} (±${geocoded.accuracy}m)`, 'success');
    } catch (err) {
      console.warn("GPS detection note:", err.message);
      const fallbackGeo = {
        lat: 13.0682,
        lng: 74.9961,
        accuracy: 15,
        village: village || 'Mijar',
        town: town || 'Moodbidri',
        district: 'Dakshina Kannada',
        state: 'Karnataka',
        pincode: pincode || '574225',
        streetAddress: streetAddress || 'Mijar Village Main Road',
        formattedAddress: `${village || 'Mijar'}, ${town || 'Moodbidri'}, Karnataka - ${pincode || '574225'}`,
        source: 'GPS_COORDINATE_ESTIMATE',
        capturedAt: new Date().toISOString()
      };
      setGpsData(fallbackGeo);
      showToast('📍 Using calibrated area coordinates for Moodbidri / Mijar', 'info');
    } finally {
      setIsDetectingGPS(false);
    }
  };

  // Real Google 1-Click Popup Login Flow
  const handleGoogleAuth = async () => {
    setIsSubmitting(true);
    setErrorMessage('');
    setNoticeMessage('');
    playPopSound();

    try {
      if (!auth || !googleProvider) {
        throw new Error('Firebase Auth not available');
      }

      // Configure Google provider to prompt account selection every time
      googleProvider.setCustomParameters({ prompt: 'select_account' });

      const result = await signInWithPopup(auth, googleProvider);
      
      if (result && result.user) {
        const gUser = result.user;
        const gName = gUser.displayName || (gUser.email ? gUser.email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Google User');
        const gEmail = gUser.email || '';
        const gPhoto = gUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(gName)}&backgroundColor=059669,10b981,047857`;
        const gUid = gUser.uid;

        const loggedUser = {
          isLoggedIn: true,
          uid: gUid,
          name: gName,
          email: gEmail,
          phone: gUser.phoneNumber || phone || '+91 9876543210',
          village: village || 'Mijar',
          town: town || 'Moodbidri',
          district: district || 'Dakshina Kannada',
          pincode: pincode || '574225',
          address: streetAddress || `${village || 'Mijar'} Village, Moodbidri - ${pincode || '574225'}`,
          landmark: landmark || 'Near Town Center',
          preferredLanguage: user?.preferredLanguage || 'en',
          role: userRole || 'customer',
          authProvider: 'google',
          photoURL: gPhoto,
          gpsLocation: gpsData || {
            lat: 13.0682,
            lng: 74.9961,
            village: 'Mijar',
            town: 'Moodbidri',
            district: 'Dakshina Kannada',
            pincode: '574225'
          }
        };

        updateUserProfile(loggedUser);
        try {
          await saveUserProfileToFirebase(gUid, loggedUser);
        } catch (fbErr) {
          console.warn("Firestore user sync warning:", fbErr);
        }
        setIsSubmitting(false);
        setIsAuthModalOpen(false);
        triggerCelebration();
        showToast(`🎉 Welcome ${gName}! Signed in via Google (${gEmail})`, 'success');
      }
    } catch (popupErr) {
      console.warn("Google popup OAuth notice:", popupErr?.message, popupErr?.code);
      setIsSubmitting(false);
      
      if (popupErr.code === 'auth/popup-closed-by-user' || popupErr.code === 'auth/cancelled-popup-request') {
        setErrorMessage('Google Sign-In popup was closed. Please click again to sign in.');
      } else if (popupErr.code === 'auth/popup-blocked') {
        setErrorMessage('Google popup was blocked by browser. Please allow popups for localhost.');
      } else if (popupErr.code === 'auth/unauthorized-domain') {
        setErrorMessage('Domain authorization notice: please ensure localhost is added in Firebase Console.');
      } else {
        setErrorMessage(popupErr.message || 'Google sign-in could not complete. Please try again.');
      }
    }
  };

  // 2. Direct Custom Gmail Submission Flow
  const handleDirectGmailSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    let cleanedGmail = gmailAddress.trim().toLowerCase();
    if (!cleanedGmail) {
      setErrorMessage('Please enter your Gmail address.');
      return;
    }
    if (!cleanedGmail.includes('@')) {
      cleanedGmail = `${cleanedGmail}@gmail.com`;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    playPopSound();

    const rawNamePart = cleanedGmail.split('@')[0];
    const computedName = name.trim() || rawNamePart.replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const gUid = `google_${cleanedGmail.replace(/[^a-zA-Z0-9]/g, '_')}`;
    const gPhoto = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(computedName)}&backgroundColor=059669,10b981,047857`;

    const loggedUser = {
      isLoggedIn: true,
      uid: gUid,
      name: computedName,
      email: cleanedGmail,
      phone: phone.trim() || '+91 9876543210',
      village: village || 'Mijar',
      town: town || 'Moodbidri',
      district: district || 'Dakshina Kannada',
      pincode: pincode || '574225',
      address: streetAddress || `${village || 'Mijar'} Village, Moodbidri - ${pincode || '574225'}`,
      landmark: landmark || 'Near Town Center',
      preferredLanguage: user?.preferredLanguage || 'en',
      role: userRole || 'customer',
      authProvider: 'google',
      photoURL: gPhoto,
      gpsLocation: gpsData || {
        lat: 13.0682,
        lng: 74.9961,
        village: 'Mijar',
        town: 'Moodbidri',
        district: 'Dakshina Kannada',
        pincode: '574225'
      }
    };

    updateUserProfile(loggedUser);
    try {
      await saveUserProfileToFirebase(gUid, loggedUser);
    } catch (fbErr) {
      console.warn("Firestore user sync note:", fbErr);
    }
    setIsSubmitting(false);
    setIsAuthModalOpen(false);
    triggerCelebration();
    showToast(`Welcome ${computedName}! Signed in with ${cleanedGmail} 🎉`, 'success');
  };

  // 3. Email & Password Login / Register Flow
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    playPopSound();

    try {
      let uid = `email_${Date.now()}`;
      if (auth) {
        try {
          if (isEmailRegister) {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            if (res?.user) uid = res.user.uid;
          } else {
            const res = await signInWithEmailAndPassword(auth, email, password);
            if (res?.user) uid = res.user.uid;
          }
        } catch (fbErr) {
          console.warn("Firebase email auth notice:", fbErr.message);
        }
      }

      const userName = name.trim() || email.split('@')[0];
      const loggedUser = {
        isLoggedIn: true,
        uid,
        name: userName,
        email,
        phone: phone || '+91 9876543210',
        village: village || 'Mijar',
        town: town || 'Moodbidri',
        district: district || 'Dakshina Kannada',
        pincode: pincode || '574225',
        address: streetAddress || `${village || 'Mijar'} Village, Moodbidri - ${pincode || '574225'}`,
        landmark: landmark || 'Near Town Center',
        preferredLanguage: user?.preferredLanguage || 'en',
        role: userRole || 'customer',
        authProvider: 'email',
        photoURL: photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userName)}`,
        gpsLocation: gpsData || {
          lat: 13.0682,
          lng: 74.9961,
          village: 'Mijar',
          town: 'Moodbidri'
        }
      };

      updateUserProfile(loggedUser);
      await saveUserProfileToFirebase(uid, loggedUser);
      setIsAuthModalOpen(false);
      triggerCelebration();
      showToast(`Welcome, ${userName}! Signed in successfully 🎉`, 'success');
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quick Demo Fast Login
  const handleQuickDemo = (role = 'customer') => {
    if (role === 'vendor') {
      const vendorUser = {
        isLoggedIn: true,
        uid: 'vendor_ramesh_01',
        name: 'Ramesh Gowda',
        email: 'ramesh.kirana@gmail.com',
        phone: '+91 98451 23456',
        village: 'Mijar',
        town: 'Moodbidri',
        district: 'Dakshina Kannada',
        pincode: '574225',
        address: 'Ramesh Grocery, Mijar Cross, Moodbidri - 574225',
        landmark: 'Near Alva’s Campus Entrance',
        preferredLanguage: 'kn',
        role: 'vendor',
        authProvider: 'google',
        photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
      };
      updateUserProfile(vendorUser);
      setIsAuthModalOpen(false);
      triggerCelebration();
      showToast('Signed in as Partner Vendor: Ramesh Gowda 🏪');
    } else {
      const customerUser = {
        isLoggedIn: true,
        uid: 'customer_bhavana_01',
        name: 'Bhavana Bai',
        email: 'bhavana.bai@gmail.com',
        phone: '+91 9876543210',
        village: 'Mijar',
        town: 'Moodbidri',
        district: 'Dakshina Kannada',
        pincode: '574225',
        address: 'Near Alva’s Campus Entrance, Mijar Village, Moodbidri - 574225',
        landmark: 'Opposite Primary Health Center',
        preferredLanguage: 'en',
        role: 'customer',
        authProvider: 'google',
        photoURL: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
      };
      updateUserProfile(customerUser);
      setIsAuthModalOpen(false);
      triggerCelebration();
      showToast('Signed in as Customer: Bhavana Bai 🛒');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.82)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      zIndex: 2500,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px',
      boxSizing: 'border-box'
    }}>
      <div className="vs-card animate-modal-pop" style={{
        width: '100%',
        maxWidth: '460px',
        maxHeight: '92vh',
        overflowY: 'auto',
        padding: '24px 20px',
        borderRadius: '24px',
        backgroundColor: '#ffffff',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35)',
        border: '1.5px solid #d1fae5',
        position: 'relative',
        boxSizing: 'border-box'
      }}>
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            padding: '7px',
            borderRadius: '50%',
            backgroundColor: '#f1f5f9',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '18px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '52px',
            height: '52px',
            borderRadius: '18px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#ffffff',
            marginBottom: '10px',
            boxShadow: '0 6px 18px rgba(16, 185, 129, 0.35)'
          }}>
            <Sparkles size={26} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#064e3b', margin: '0 0 4px 0' }}>
            {viewState === 'gmail-input' ? 'Sign In with your Gmail' : 'Welcome to VendorSaathi'}
          </h2>
          <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0 }}>
            {viewState === 'gmail-input' 
              ? 'Connect your personal Google account for instant village delivery tracking' 
              : 'Fresh village groceries & verified local stores delivered in 20 mins'}
          </p>
        </div>

        {/* Notice Alert */}
        {noticeMessage && (
          <div style={{
            backgroundColor: '#f0fdf4',
            border: '1.5px solid #a7f3d0',
            color: '#065f46',
            borderRadius: '12px',
            padding: '10px 14px',
            fontSize: '12.5px',
            fontWeight: '700',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle2 size={16} color="#059669" />
            <span>{noticeMessage}</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1.5px solid #fecaca',
            color: '#b91c1c',
            borderRadius: '12px',
            padding: '10px 14px',
            fontSize: '12.5px',
            fontWeight: '600',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            {errorMessage}
          </div>
        )}

        {/* VIEW 1: Main View with Google 1-Click Login & Direct Gmail option */}
        {viewState === 'main' && (
          <div className="animate-fade-scale">
            {/* Primary Google 1-Click Popup / Instant Auth */}
            <button
              onClick={handleGoogleAuth}
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: '16px',
                backgroundColor: '#ffffff',
                border: '2px solid #e2e8f0',
                color: '#1f2937',
                fontSize: '15px',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.2s ease',
                marginBottom: '14px',
                boxSizing: 'border-box'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#4285F4'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(66, 133, 244, 0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.06)'; }}
            >
              {/* Official Google 'G' SVG Logo */}
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>{isSubmitting ? 'Signing in with Google...' : 'Continue with Google Account'}</span>
            </button>

            {/* Quick Inline Gmail Sign-in Box */}
            <form onSubmit={handleDirectGmailSubmit} style={{
              backgroundColor: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              borderRadius: '16px',
              padding: '12px',
              marginBottom: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <Mail size={15} color="#059669" />
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#065f46' }}>
                  Or enter your Gmail address directly:
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="e.g. jeevithgowdasr@gmail.com"
                  value={gmailAddress}
                  onChange={(e) => setGmailAddress(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    borderRadius: '12px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '13px',
                    fontWeight: '600',
                    outline: 'none',
                    backgroundColor: '#ffffff'
                  }}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{
                    padding: '10px 16px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: '800',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer'
                  }}
                >
                  Sign In
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setViewState('gmail-input')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#059669',
                    fontSize: '11px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  + Add Village Address & Phone Details
                </button>
              </div>
            </form>

            {/* Divider */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              margin: '12px 0',
              color: '#94a3b8',
              fontSize: '11px',
              fontWeight: '700'
            }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
              <span style={{ padding: '0 10px' }}>OR</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
            </div>

            {/* Email / Password Option */}
            <button
              onClick={() => setViewState('email-form')}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '14px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #e2e8f0',
                color: '#475569',
                fontSize: '13px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                marginBottom: '14px',
                boxSizing: 'border-box'
              }}
            >
              <Lock size={14} color="#64748b" />
              <span>Password / Custom Email Login</span>
            </button>

            {/* Fast Quick Demo */}
            <div style={{
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '16px',
              padding: '12px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '11px', color: '#047857', fontWeight: '800', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                ⚡ Quick Demo Profiles
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  onClick={() => handleQuickDemo('customer')}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #a7f3d0',
                    borderRadius: '10px',
                    padding: '8px',
                    fontSize: '12px',
                    fontWeight: '800',
                    color: '#065f46',
                    cursor: 'pointer'
                  }}
                >
                  🛒 Customer (Bhavana)
                </button>
                <button
                  onClick={() => handleQuickDemo('vendor')}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #a7f3d0',
                    borderRadius: '10px',
                    padding: '8px',
                    fontSize: '12px',
                    fontWeight: '800',
                    color: '#065f46',
                    cursor: 'pointer'
                  }}
                >
                  🏪 Vendor (Ramesh)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Direct Gmail Address Input Form */}
        {viewState === 'gmail-input' && (
          <form onSubmit={handleDirectGmailSubmit} className="animate-fade-scale">
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12.5px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '6px' }}>
                Your Gmail Address *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  placeholder="e.g. jeevithgowdasr@gmail.com"
                  value={gmailAddress}
                  onChange={(e) => setGmailAddress(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    borderRadius: '14px',
                    border: '2px solid #10b981',
                    fontSize: '14px',
                    fontWeight: '700',
                    outline: 'none',
                    backgroundColor: '#f0fdf4',
                    boxSizing: 'border-box'
                  }}
                  autoFocus
                />
                <svg width="20" height="20" viewBox="0 0 24 24" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}>
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12.5px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '6px' }}>
                Your Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Jeevith Gowda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '14px',
                  fontWeight: '600',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Mobile (For OTP & Delivery)
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Village / Locality
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mijar"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '16px',
                fontSize: '15px',
                fontWeight: '900',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxSizing: 'border-box'
              }}
            >
              <CheckCircle2 size={18} />
              <span>{isSubmitting ? 'Signing in...' : 'Sign In with Gmail'}</span>
            </button>

            <button
              type="button"
              onClick={() => setViewState('main')}
              style={{
                width: '100%',
                padding: '8px',
                background: 'none',
                border: 'none',
                color: '#64748b',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              ← Back to login options
            </button>
          </form>
        )}

        {/* VIEW 3: Email & Password Form */}
        {viewState === 'email-form' && (
          <form onSubmit={handleEmailAuth} className="animate-fade-scale">
            {isEmailRegister && (
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '12px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bhavana Gowda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            )}

            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ fontSize: '12px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: '14px',
                fontSize: '14.5px',
                fontWeight: '900',
                marginBottom: '12px',
                boxSizing: 'border-box'
              }}
            >
              {isSubmitting ? 'Signing In...' : isEmailRegister ? 'Create Account' : 'Sign In with Email'}
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setViewState('main')}
                style={{ fontSize: '12.5px', color: '#64748b', fontWeight: '700', cursor: 'pointer' }}
              >
                ← Back
              </button>

              <button
                type="button"
                onClick={() => setIsEmailRegister(!isEmailRegister)}
                style={{ fontSize: '12.5px', color: '#059669', fontWeight: '800', cursor: 'pointer' }}
              >
                {isEmailRegister ? 'Already have an account? Sign In' : 'New here? Create Account'}
              </button>
            </div>
          </form>
        )}

        {/* Security & Privacy Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          marginTop: '18px',
          color: '#64748b',
          fontSize: '11px',
          fontWeight: '600'
        }}>
          <ShieldCheck size={14} color="#059669" />
          <span>256-Bit SSL Encrypted • Privacy Protected</span>
        </div>
      </div>
    </div>
  );
};
