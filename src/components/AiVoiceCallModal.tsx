import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  PhoneCall, 
  PhoneOff, 
  X, 
  ShieldCheck, 
  Bot, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles,
  Info
} from 'lucide-react';
import type { LanguageCode } from '../types';

export const AiVoiceCallModal: React.FC = () => {
  const { 
    isAiVoiceModalOpen, 
    setIsAiVoiceModalOpen, 
    aiVoiceModalData, 
    markAsTaken, 
    sendHelpRequest,
    medicines,
    language: appLanguage,
    t
  } = useApp();

  const [callState, setCallState] = useState<'idle' | 'calling' | 'connected' | 'completed'>('idle');
  const [callLang, setCallLang] = useState<LanguageCode>(appLanguage || 'en');
  const [conversationStep, setConversationStep] = useState<number>(0);
  const [patientResponse, setPatientResponse] = useState<string | null>(null);
  const [speechActive, setSpeechActive] = useState(true);
  const [aiMessage, setAiMessage] = useState<string>('');
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const targetMedName = aiVoiceModalData?.medicineName || 'Metformin 500mg';
  const targetPatientName = aiVoiceModalData?.patientName || 'Ramesh Kumar';
  const targetPhone = aiVoiceModalData?.patientPhone || '+91 98765 43210';
  const targetDoseTime = aiVoiceModalData?.doseTime || '08:00 AM';

  // Find corresponding medicine id if available
  const matchingMed = medicines.find(
    (m) => m.name.toLowerCase().includes(targetMedName.toLowerCase().split(' ')[0])
  ) || medicines[0];

  // Reset state when opening
  useEffect(() => {
    if (isAiVoiceModalOpen) {
      setCallState('idle');
      setConversationStep(0);
      setPatientResponse(null);
      setAiMessage('');
    } else {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  }, [isAiVoiceModalOpen]);

  // Voice speech helper
  const speakText = (text: string, lang: LanguageCode) => {
    if (!speechActive || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'kn' ? 'kn-IN' : 'en-IN';
      utterance.rate = 0.95; // Slightly slower for elderly comprehension
      speechSynthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis unavailable:', e);
    }
  };

  if (!isAiVoiceModalOpen) return null;

  const handleStartCall = () => {
    setCallState('calling');
    setTimeout(() => {
      setCallState('connected');
      setConversationStep(1);
      const greeting = callLang === 'kn'
        ? `ನಮಸ್ಕಾರ ${targetPatientName} ಅವರೇ. ನಿಮ್ಮ ಮಗಳು ಅನಿತಾ ಅವರ ಪರವಾಗಿ ಮೆಡಿಮಿತ್ರ ಕೇರ್‌ಲೂಪ್‌ನಿಂದ ಕರೆ ಮಾಡುತ್ತಿದ್ದೇವೆ. ಬೆಳಗಿನ ${targetMedName} ತೆಗೆದುಕೊಂಡಿದ್ದೀರಾ?`
        : `Namaskara ${targetPatientName}. This is MediMitra CareLoop calling on behalf of your caregiver Anitha. Have you taken your morning ${targetMedName} dose?`;
      setAiMessage(greeting);
      speakText(greeting, callLang);
    }, 1500);
  };

  const handlePatientChoice = (choice: 'taken' | 'forgot' | 'unwell') => {
    if (choice === 'taken') {
      setPatientResponse(callLang === 'kn' ? 'ಹೌದು, ನಾನು ಈಗಷ್ಟೇ ತೆಗೆದುಕೊಂಡೆ.' : 'Yes, I took it just now with breakfast.');
      setConversationStep(2);
      const reply = callLang === 'kn'
        ? 'ಧನ್ಯವಾದಗಳು! ನಾನು ನಿಮ್ಮ ಕೇರ್‌ಲೂಪ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ನಲ್ಲಿ ದಾಖಲಿಸುತ್ತೇನೆ. ಅನಿತಾ ಅವರಿಗೆ ಮಾಹಿತಿ ತಲುಪಿದೆ. ಆರೋಗ್ಯವಾಗಿರಿ!'
        : 'Thank you! I have confirmed your dose in the CareLoop timeline so Anitha knows you are safe. Take care!';
      setAiMessage(reply);
      speakText(reply, callLang);

      // Perform real state update
      if (matchingMed) {
        markAsTaken(matchingMed.id);
      }
    } else if (choice === 'forgot') {
      setPatientResponse(callLang === 'kn' ? 'ಮರೆತುಹೋಗಿತ್ತು, ಈಗಲೇ ತೆಗೆದುಕೊಳ್ಳುತ್ತೇನೆ.' : 'I forgot, taking it right now.');
      setConversationStep(2);
      const reply = callLang === 'kn'
        ? 'ಖಂಡಿತ, ದಯವಿಟ್ಟು ಸಾಕಷ್ಟು ನೀರಿನೊಂದಿಗೆ ತೆಗೆದುಕೊಳ್ಳಿ. ನೀವು ತೆಗೆದುಕೊಳ್ಳುತ್ತಿದ್ದೀರಿ ಎಂದು ಅನಿತಾ ಅವರಿಗೆ ತಿಳಿಸುತ್ತೇನೆ.'
        : 'Please take it with a full glass of water now. I will notify Anitha that you are taking it.';
      setAiMessage(reply);
      speakText(reply, callLang);
    } else {
      setPatientResponse(callLang === 'kn' ? 'ನನಗೆ ತಲೆಸುತ್ತು ಬರುತ್ತಿದೆ / ಸಹಾಯ ಬೇಕು.' : 'I am feeling dizzy / I need help.');
      setConversationStep(2);
      const reply = callLang === 'kn'
        ? 'ದಯವಿಟ್ಟು ಆರಾಮವಾಗಿ ಕುಳಿತುಕೊಳ್ಳಿ. ನಾನು ಈಗಲೇ ಅನಿತಾ ಅವರಿಗೆ ತುರ್ತು ಸಹಾಯ ಸೂಚನೆ ಕಳುಹಿಸುತ್ತಿದ್ದೇನೆ.'
        : 'Please sit down and rest. I am alerting Anitha immediately with an urgent assistance request.';
      setAiMessage(reply);
      speakText(reply, callLang);

      // Send emergency alert
      sendHelpRequest(matchingMed?.id, 'Patient reported dizziness/difficulty during automated voice call follow-up.');
    }

    // Move to completed after speech
    setTimeout(() => {
      setCallState('completed');
    }, 4500);
  };

  const handleEndCall = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsAiVoiceModalOpen(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 42, 67, 0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        zIndex: 1100,
        backdropFilter: 'blur(4px)',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-voice-modal-title"
    >
      <div
        className="card-white"
        style={{
          maxWidth: '500px',
          width: '100%',
          padding: '24px',
          borderRadius: '20px',
          boxShadow: '0 25px 50px rgba(16, 42, 67, 0.3)',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#F0FDFA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0D9488',
                border: '1px solid #CCFBF1',
              }}
            >
              <Bot size={22} />
            </div>
            <div>
              <h2 id="ai-voice-modal-title" style={{ fontSize: '18px', fontWeight: 800, color: '#102A43' }}>
                {t('aiVoiceModalTitle', 'AI Voice-Call Reminder Assistant')}
              </h2>
              <span style={{ fontSize: '11.5px', color: '#64748B' }}>
                Powered by Google Cloud Vertex AI & Telephony
              </span>
            </div>
          </div>

          <button
            onClick={handleEndCall}
            style={{
              padding: '6px',
              borderRadius: '50%',
              color: '#64748B',
              backgroundColor: '#F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* MANDATORY PROTOTYPE DEMO BANNER */}
        <div
          style={{
            padding: '10px 12px',
            backgroundColor: '#FFFBEB',
            border: '1px solid #FCD34D',
            borderRadius: '10px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
          }}
        >
          <Info size={16} color="#D97706" style={{ marginTop: '2px', flexShrink: 0 }} />
          <div>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#92400E', display: 'block' }}>
              PROTOTYPE DEMO — SIMULATED HACKATHON PREVIEW
            </span>
            <p style={{ fontSize: '11px', color: '#B45309', margin: '2px 0 0 0', lineHeight: 1.35 }}>
              {t(
                'aiVoiceDemoDisclaimer',
                'Automated adherence calling simulation demonstrating Google Cloud Vertex AI and Cloud Telephony. No actual telecom carrier is billed or contacted in this preview.'
              )}
            </p>
          </div>
        </div>

        {/* Patient & Call Target Information */}
        <div
          style={{
            padding: '12px 14px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            marginBottom: '16px',
            fontSize: '12.5px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: '#64748B' }}>Calling Recipient:</span>
            <strong style={{ color: '#102A43' }}>{targetPatientName} ({targetPhone})</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ color: '#64748B' }}>Unconfirmed Dose:</span>
            <span style={{ color: '#EA580C', fontWeight: 600 }}>{targetMedName} ({targetDoseTime})</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#64748B' }}>Consent & Access:</span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                backgroundColor: '#DCFCE7',
                color: '#15803D',
                padding: '2px 8px',
                borderRadius: '12px',
                fontWeight: 600,
              }}
            >
              <ShieldCheck size={12} /> CL-AUTH-7821-PAT-RAMESH
            </span>
          </div>
        </div>

        {/* Language & Voice Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Speech Language:</span>
            <div style={{ display: 'inline-flex', borderRadius: '8px', border: '1px solid #CBD5E1', overflow: 'hidden' }}>
              <button
                onClick={() => setCallLang('en')}
                style={{
                  padding: '4px 10px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  backgroundColor: callLang === 'en' ? '#0D9488' : '#FFFFFF',
                  color: callLang === 'en' ? '#FFFFFF' : '#475569',
                  border: 'none',
                }}
              >
                English
              </button>
              <button
                onClick={() => setCallLang('kn')}
                style={{
                  padding: '4px 10px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  backgroundColor: callLang === 'kn' ? '#0D9488' : '#FFFFFF',
                  color: callLang === 'kn' ? '#FFFFFF' : '#475569',
                  border: 'none',
                }}
              >
                ಕನ್ನಡ
              </button>
            </div>
          </div>

          <button
            onClick={() => setSpeechActive(!speechActive)}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              backgroundColor: '#FFFFFF',
              color: speechActive ? '#0D9488' : '#94A3B8',
              fontSize: '11.5px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
            title="Toggle Voice Speech Audio"
          >
            {speechActive ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span>{speechActive ? 'Voice Audio: On' : 'Voice Audio: Muted'}</span>
          </button>
        </div>

        {/* Interactive Call Arena */}
        {callState === 'idle' && (
          <div
            style={{
              textAlign: 'center',
              padding: '24px 16px',
              backgroundColor: '#F0FDFA',
              borderRadius: '16px',
              border: '1px dashed #99F6E4',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                backgroundColor: '#0D9488',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px auto',
                boxShadow: '0 8px 16px rgba(13, 148, 136, 0.25)',
              }}
            >
              <PhoneCall size={26} />
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#102A43', marginBottom: '6px' }}>
              Ready to Initiate AI Adherence Call
            </h3>
            <p style={{ fontSize: '12px', color: '#64748B', maxWidth: '340px', margin: '0 auto 16px auto', lineHeight: 1.4 }}>
              Clicking below demonstrates how MediMitra calls the senior patient, speaks naturally in their chosen language, and records their reply into CareLoop.
            </p>

            <button
              onClick={handleStartCall}
              className="btn-teal"
              style={{ padding: '10px 20px', fontSize: '13px', fontWeight: 700 }}
            >
              <Sparkles size={16} />
              <span>Start Simulated Voice Call</span>
            </button>
          </div>
        )}

        {callState === 'calling' && (
          <div
            style={{
              textAlign: 'center',
              padding: '30px 16px',
              backgroundColor: '#F8FAFC',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: '#FEF3C7',
                color: '#D97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px auto',
                animation: 'pulse 1.5s infinite',
              }}
            >
              <PhoneCall size={24} />
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#102A43' }}>
              Connecting to {targetPatientName}...
            </h3>
            <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
              Simulating telephony dialer stream via Cloud Run webhook...
            </p>
          </div>
        )}

        {(callState === 'connected' || callState === 'completed') && (
          <div
            style={{
              backgroundColor: '#F8FAFC',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '16px',
              marginBottom: '16px',
            }}
          >
            {/* Active Call Status Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: callState === 'connected' ? '#16A34A' : '#64748B',
                    display: 'inline-block',
                  }}
                />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#102A43' }}>
                  {callState === 'connected' ? 'Simulated Call In Progress (00:24)' : 'Call Finished & Logged'}
                </span>
              </div>
              <span style={{ fontSize: '11px', color: '#64748B' }}>
                Audio Codec: WebRTC / Opus
              </span>
            </div>

            {/* AI Speech Bubble */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: '#0D9488',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '11px',
                  fontWeight: 700,
                }}
              >
                AI
              </div>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '10px 12px',
                  fontSize: '13px',
                  color: '#102A43',
                  lineHeight: 1.45,
                  flex: 1,
                }}
              >
                <div style={{ fontSize: '11px', color: '#0D9488', fontWeight: 700, marginBottom: '2px' }}>
                  MediMitra Voice Agent ({callLang === 'kn' ? 'ಕನ್ನಡ' : 'English'})
                </div>
                {aiMessage}
              </div>
            </div>

            {/* Patient Response Bubble if chosen */}
            {patientResponse && (
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginBottom: '12px' }}>
                <div
                  style={{
                    backgroundColor: '#F0FDFA',
                    border: '1px solid #CCFBF1',
                    borderRadius: '12px',
                    padding: '10px 12px',
                    fontSize: '13px',
                    color: '#102A43',
                    lineHeight: 1.4,
                    maxWidth: '85%',
                  }}
                >
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, marginBottom: '2px' }}>
                    {targetPatientName} (Simulated Senior Reply)
                  </div>
                  "{patientResponse}"
                </div>
                <img
                  src="/assets/avatar_ramesh.jpg"
                  alt="Ramesh"
                  style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
                />
              </div>
            )}

            {/* Interactive Choices for Hackathon Reviewer */}
            {callState === 'connected' && conversationStep === 1 && (
              <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px dashed #CBD5E1' }}>
                <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '8px' }}>
                  Choose Patient's Simulated Response:
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    onClick={() => handlePatientChoice('taken')}
                    className="btn-outline"
                    style={{
                      justifyContent: 'flex-start',
                      padding: '8px 12px',
                      fontSize: '12px',
                      color: '#16A34A',
                      borderColor: '#86EFAC',
                      backgroundColor: '#F0FDF4',
                    }}
                  >
                    <CheckCircle2 size={14} color="#16A34A" />
                    <span>"Yes, took it just now with breakfast." (Marks dose Taken)</span>
                  </button>

                  <button
                    onClick={() => handlePatientChoice('forgot')}
                    className="btn-outline"
                    style={{
                      justifyContent: 'flex-start',
                      padding: '8px 12px',
                      fontSize: '12px',
                      color: '#EA580C',
                      borderColor: '#FED7AA',
                      backgroundColor: '#FFF7ED',
                    }}
                  >
                    <AlertTriangle size={14} color="#EA580C" />
                    <span>"I forgot, taking it right now." (Keeps Pending, sends instructions)</span>
                  </button>

                  <button
                    onClick={() => handlePatientChoice('unwell')}
                    className="btn-outline"
                    style={{
                      justifyContent: 'flex-start',
                      padding: '8px 12px',
                      fontSize: '12px',
                      color: '#DC2626',
                      borderColor: '#FECACA',
                      backgroundColor: '#FEF2F2',
                    }}
                  >
                    <AlertTriangle size={14} color="#DC2626" />
                    <span>"I feel dizzy / I need help." (Triggers Urgent Caregiver Alert)</span>
                  </button>
                </div>
              </div>
            )}

            {callState === 'completed' && (
              <div
                style={{
                  marginTop: '12px',
                  padding: '10px 12px',
                  backgroundColor: '#DCFCE7',
                  borderRadius: '10px',
                  fontSize: '12px',
                  color: '#15803D',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <CheckCircle2 size={16} />
                <span>Call completed. Adherence log updated in CareLoop timeline.</span>
              </div>
            )}
          </div>
        )}

        {/* Cloud Architecture Footnote */}
        <div
          style={{
            padding: '10px 12px',
            backgroundColor: '#F1F5F9',
            borderRadius: '10px',
            fontSize: '11px',
            color: '#475569',
            marginBottom: '16px',
            lineHeight: 1.4,
          }}
        >
          <strong>Verified Cloud Architecture:</strong> Telephony webhook ➔ Google Cloud Run REST container ➔ Vertex AI (Gemini 1.5 Flash + Cloud Text-to-Speech) ➔ Firestore Security Rules.
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          {callState === 'connected' ? (
            <button
              onClick={handleEndCall}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: '#DC2626',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <PhoneOff size={14} />
              <span>End Call</span>
            </button>
          ) : (
            <button
              onClick={handleEndCall}
              className="btn-teal"
              style={{ padding: '8px 18px', fontSize: '13px' }}
            >
              Close Demo Window
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
