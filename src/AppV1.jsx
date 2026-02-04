import React, { useState, useEffect, useRef } from 'react';

const OrielSmartServicesInfographic = () => {
  const [activeView, setActiveView] = useState('overview');
  const [activeJourney, setActiveJourney] = useState(null);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [journeyStep, setJourneyStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [scrolled, setScrolled] = useState(0);

  const journeys = {
    outpatient: {
      title: 'Outpatient Journey',
      icon: '👁️',
      color: '#0891B2',
      gradient: 'from-cyan-500 to-teal-600',
      persona: 'Sarah, 58',
      description: 'Routine eye examination and prescription collection',
      steps: [
        {
          id: 'arrival',
          title: 'Smart Arrival',
          location: 'Main Entrance',
          time: '09:15',
          physical: 'Patient enters through automated doors, detected by proximity sensors',
          digital: ['Visitor Management recognizes appointment', 'Digital signage displays personalized welcome', 'Wayfinding activates on mobile app'],
          background: ['Building adjusts climate based on occupancy', 'Security systems verify credentials', 'Real-time capacity monitoring updates'],
          icon: '🚪'
        },
        {
          id: 'checkin',
          title: 'Self-Service Check-in',
          location: 'Reception Kiosk',
          time: '09:18',
          physical: 'Patient approaches check-in kiosk with touch-free interface',
          digital: ['Biometric or QR code verification', 'Appointment details confirmed', 'Insurance/NHS number validated', 'Wait time displayed'],
          background: ['Patient flow system updated', 'Clinic notified of arrival', 'Digital queue management initiated'],
          icon: '✅'
        },
        {
          id: 'wayfinding',
          title: 'Guided Navigation',
          location: 'Corridors & Lifts',
          time: '09:20',
          physical: 'Patient follows digital breadcrumbs to clinic on Level 4',
          digital: ['Step-by-step navigation on mobile', 'Dynamic signage adjusts to patient', 'Lift called automatically', 'Accessibility routes offered'],
          background: ['RTLS tracks patient location', 'Clinic receives ETA notification', 'Room prepared for arrival'],
          icon: '🧭'
        },
        {
          id: 'waiting',
          title: 'Intelligent Waiting',
          location: 'Eye Clinic Waiting Area',
          time: '09:25',
          physical: 'Patient seated in comfortable, well-lit waiting area',
          digital: ['Real-time queue position on screen', 'Estimated wait time updated', 'Entertainment & health content available', 'Called via app notification'],
          background: ['Environmental sensors adjust lighting', 'Air quality monitored', 'Occupancy tracked for social distancing'],
          icon: '⏳'
        },
        {
          id: 'consultation',
          title: 'Clinical Consultation',
          location: 'Consultation Room 4B',
          time: '09:40',
          physical: 'Clinician reviews patient history on integrated display',
          digital: ['Patient record accessed via HIE', 'Diagnostic equipment connected', 'Notes captured digitally', 'Prescriptions generated electronically'],
          background: ['Room booking system marks occupied', 'Climate adjusted for procedure', 'Equipment sterilization logged'],
          icon: '👨‍⚕️'
        },
        {
          id: 'pharmacy',
          title: 'Pharmacy Collection',
          location: 'Outpatient Pharmacy',
          time: '10:05',
          physical: 'Patient navigates to pharmacy using wayfinding',
          digital: ['Prescription ready notification', 'Collection point assigned', 'Digital queue position', 'Medication information provided'],
          background: ['Inventory management updated', 'Dispensing records logged', 'Follow-up appointments suggested'],
          icon: '💊'
        },
        {
          id: 'departure',
          title: 'Smart Departure',
          location: 'Main Exit',
          time: '10:20',
          physical: 'Patient exits through automated doors',
          digital: ['Visit summary sent to app', 'Feedback survey prompted', 'Follow-up appointment details', 'Transport options displayed'],
          background: ['Visit analytics captured', 'Patient flow data updated', 'Satisfaction metrics collected'],
          icon: '👋'
        }
      ]
    },
    clinician: {
      title: 'Clinician Workflow',
      icon: '🩺',
      color: '#7C3AED',
      gradient: 'from-violet-500 to-purple-600',
      persona: 'Dr. James Chen',
      description: 'Consultant Ophthalmologist conducting morning clinic',
      steps: [
        {
          id: 'arrival',
          title: 'Staff Arrival',
          location: 'Staff Entrance',
          time: '08:30',
          physical: 'Clinician enters via secure staff entrance',
          digital: ['Badge access with RFID', 'Today\'s schedule displayed', 'Urgent messages highlighted', 'Room assignments confirmed'],
          background: ['Access control logs entry', 'Fire system registers presence', 'Workstation prepared'],
          icon: '🏥'
        },
        {
          id: 'briefing',
          title: 'Digital Briefing',
          location: 'Clinical Office',
          time: '08:35',
          physical: 'Reviews patient list and clinical priorities',
          digital: ['Patient dashboard overview', 'Critical alerts flagged', 'Research notes accessible', 'Team communications hub'],
          background: ['Room booking confirms office', 'Equipment availability checked', 'Support staff notified'],
          icon: '📋'
        },
        {
          id: 'room_prep',
          title: 'Room Preparation',
          location: 'Consultation Room',
          time: '08:55',
          physical: 'Clinician enters allocated consultation room',
          digital: ['Room automatically configured', 'Equipment powered up', 'Patient list loaded', 'Diagnostic tools ready'],
          background: ['Climate optimized for procedures', 'Lighting adjusted', 'Sterilization status verified'],
          icon: '🔧'
        },
        {
          id: 'patient_care',
          title: 'Patient Consultations',
          location: 'Consultation Room 4B',
          time: '09:00 - 12:30',
          physical: 'Conducts examinations and consultations',
          digital: ['One-click patient record access', 'AI-assisted diagnostics', 'Digital imaging integration', 'E-prescribing'],
          background: ['Nurse call system active', 'Porter request available', 'Emergency protocols ready'],
          icon: '👁️'
        },
        {
          id: 'collaboration',
          title: 'MDT Collaboration',
          location: 'Meeting Room Level 6',
          time: '12:45',
          physical: 'Joins multidisciplinary team meeting',
          digital: ['AV equipment auto-configured', 'Case presentations on display', 'Remote participants connected', 'Digital whiteboard active'],
          background: ['Room booking managed transition', 'Catering notification sent', 'Recording compliance checked'],
          icon: '👥'
        },
        {
          id: 'research',
          title: 'Research Integration',
          location: 'UCL Research Wing',
          time: '14:00',
          physical: 'Accesses research facilities and data',
          digital: ['Unified data platform access', 'Patient consent management', 'Trial recruitment dashboard', 'Publication tracking'],
          background: ['Cross-site data sharing', 'Compliance monitoring', 'Grant management integration'],
          icon: '🔬'
        },
        {
          id: 'handover',
          title: 'Digital Handover',
          location: 'Clinical Hub',
          time: '17:00',
          physical: 'Completes shift with comprehensive handover',
          digital: ['Automated shift summary', 'Outstanding tasks flagged', 'On-call team notified', 'Patient status updates'],
          background: ['Analytics dashboard updated', 'Resource utilization logged', 'Next day prep initiated'],
          icon: '🔄'
        }
      ]
    },
    surgical: {
      title: 'Surgical Pathway',
      icon: '🔬',
      color: '#DC2626',
      gradient: 'from-red-500 to-rose-600',
      persona: 'Michael, 72',
      description: 'Cataract surgery with pre-assessment and day case discharge',
      steps: [
        {
          id: 'preassess',
          title: 'Pre-Assessment',
          location: 'Pre-Op Suite',
          time: 'Day -7',
          physical: 'Patient attends pre-operative assessment',
          digital: ['Comprehensive health questionnaire', 'Risk scoring automated', 'Consent captured digitally', 'Surgery date confirmed'],
          background: ['Theatre scheduling optimized', 'Equipment reserved', 'Blood tests ordered'],
          icon: '📝'
        },
        {
          id: 'dayof_arrival',
          title: 'Surgery Day Arrival',
          location: 'Day Surgery Unit',
          time: '07:00',
          physical: 'Patient arrives for scheduled procedure',
          digital: ['Priority check-in activated', 'Surgical checklist initiated', 'Wristband printed with QR', 'Family waiting area assigned'],
          background: ['Theatre confirmed ready', 'Surgical team notified', 'Recovery bay allocated'],
          icon: '🌅'
        },
        {
          id: 'prep',
          title: 'Surgical Preparation',
          location: 'Pre-Op Bay',
          time: '07:30',
          physical: 'Patient prepared for surgery',
          digital: ['Vital signs auto-captured', 'Medication administered & logged', 'Surgeon reviews imaging', 'WHO checklist digital'],
          background: ['Theatre status tracked', 'Equipment sterilization verified', 'Implant selection confirmed'],
          icon: '💉'
        },
        {
          id: 'theatre',
          title: 'Operating Theatre',
          location: 'Theatre Suite Level 3',
          time: '08:15',
          physical: 'Procedure performed with integrated technology',
          digital: ['Live surgical imaging', 'AI-assisted precision', 'Real-time documentation', 'Implant tracking logged'],
          background: ['Environmental controls optimized', 'Emergency systems on standby', 'Time tracking active'],
          icon: '⚕️'
        },
        {
          id: 'recovery',
          title: 'Smart Recovery',
          location: 'Recovery Suite',
          time: '09:00',
          physical: 'Post-operative monitoring and recovery',
          digital: ['Continuous vital monitoring', 'Pain scores captured', 'Recovery milestones tracked', 'Family updates automated'],
          background: ['Discharge planning initiated', 'Pharmacy notified', 'Transport arranged'],
          icon: '🛏️'
        },
        {
          id: 'discharge',
          title: 'Coordinated Discharge',
          location: 'Discharge Lounge',
          time: '11:30',
          physical: 'Patient prepared for safe discharge',
          digital: ['Discharge summary generated', 'Medication instructions provided', 'Follow-up booked automatically', 'GP notified electronically'],
          background: ['Patient transport confirmed', 'Feedback survey sent', 'Bed management updated'],
          icon: '🏠'
        }
      ]
    },
    student: {
      title: 'Student Experience',
      icon: '🎓',
      color: '#059669',
      gradient: 'from-emerald-500 to-green-600',
      persona: 'Priya Sharma',
      description: 'MSc Ophthalmology student attending lectures and clinical placements',
      steps: [
        {
          id: 'campus_arrival',
          title: 'Campus Arrival',
          location: 'UCL Entrance Level 8',
          time: '08:45',
          physical: 'Student enters via dedicated UCL entrance',
          digital: ['Student ID grants access', 'Timetable synced to display', 'Locker assignment shown', 'Campus map loaded'],
          background: ['Attendance logged', 'Learning resources unlocked', 'Study spaces availability shown'],
          icon: '🚶'
        },
        {
          id: 'lecture',
          title: 'Smart Lecture Hall',
          location: 'Lecture Theatre Level 9',
          time: '09:00',
          physical: 'Attends ophthalmology lecture',
          digital: ['AV auto-configured for session', 'Lecture recording started', 'Interactive polling active', 'Materials auto-shared'],
          background: ['Attendance captured', 'Room climate optimized', 'Accessibility features enabled'],
          icon: '📚'
        },
        {
          id: 'simulation',
          title: 'Simulation Lab',
          location: 'Clinical Skills Centre',
          time: '11:00',
          physical: 'Practices surgical techniques',
          digital: ['VR equipment personalized', 'Performance metrics tracked', 'AI feedback provided', 'Progress logged to portfolio'],
          background: ['Equipment usage tracked', 'Sterilization scheduled', 'Booking system updated'],
          icon: '🥽'
        },
        {
          id: 'clinical',
          title: 'Clinical Placement',
          location: 'Eye Clinic',
          time: '14:00',
          physical: 'Observes consultant clinic',
          digital: ['Supervised access to records', 'Learning objectives tracked', 'Case log digitally captured', 'Mentor feedback recorded'],
          background: ['Compliance verified', 'Supervision logged', 'Competency framework updated'],
          icon: '👨‍⚕️'
        },
        {
          id: 'research',
          title: 'Research Access',
          location: 'Research Library Level 10',
          time: '16:00',
          physical: 'Accesses research databases and quiet study',
          digital: ['Unified library access', 'Research data available', 'Collaboration tools active', 'Citation management'],
          background: ['Study space booking managed', 'Printing credits tracked', 'Resource usage analytics'],
          icon: '📖'
        }
      ]
    }
  };

  const smartSystems = {
    visitor_management: {
      title: 'Visitor Management',
      icon: '👥',
      color: '#0891B2',
      description: 'Intelligent visitor pre-registration, arrival detection, and host notification',
      features: ['Pre-registration portal', 'QR code check-in', 'Host notifications', 'Visitor badges', 'Compliance tracking'],
      integration: 'Connects with access control, wayfinding, and security systems'
    },
    self_checkin: {
      title: 'Self-Service Check-in',
      icon: '✅',
      color: '#059669',
      description: 'Touch-free patient registration with biometric and QR verification',
      features: ['Kiosk and mobile options', 'Identity verification', 'Insurance validation', 'Appointment confirmation', 'Queue management'],
      integration: 'Integrates with PAS, EPR, and patient flow systems via HIE'
    },
    wayfinding: {
      title: 'Digital Wayfinding',
      icon: '🧭',
      color: '#7C3AED',
      description: 'Turn-by-turn indoor navigation with real-time updates',
      features: ['Mobile app guidance', 'Accessibility routes', 'Dynamic directions', 'Estimated walk times', 'Multilingual support'],
      integration: 'Connected to room booking, clinic schedules, and RTLS'
    },
    signage: {
      title: 'Digital Signage',
      icon: '📺',
      color: '#DC2626',
      description: 'Context-aware displays throughout the building',
      features: ['Dynamic content', 'Emergency alerts', 'Queue displays', 'Health messaging', 'Wayfinding integration'],
      integration: 'Managed centrally with local override capabilities'
    },
    room_booking: {
      title: 'Room & Desk Booking',
      icon: '🗓️',
      color: '#D97706',
      description: 'Intelligent space management across clinical, research, and education areas',
      features: ['Real-time availability', 'Equipment booking', 'Recurring meetings', 'No-show detection', 'Usage analytics'],
      integration: 'Part of IWMS platform with IoT sensor verification'
    },
    control_centre: {
      title: 'Hospital Operations Centre',
      icon: '🎛️',
      color: '#1D4ED8',
      description: 'Unified command and control for all building operations',
      features: ['Single pane of glass', 'Real-time monitoring', 'Incident management', 'Resource coordination', 'Predictive alerts'],
      integration: 'Aggregates data from all smart systems via IOP'
    }
  };

  const [selectedFloor, setSelectedFloor] = useState(null);

  const buildingLevels = [
    { 
      level: 10, 
      name: 'Research Labs & UCL Offices', 
      color: '#059669',
      description: 'State-of-the-art research facilities for ophthalmology innovation',
      smartFeatures: ['Secure lab access control', 'Environmental monitoring', 'Data platform integration', 'Collaboration spaces'],
      keyAreas: ['Wet labs', 'Dry labs', 'Research offices', 'Data analysis suites'],
      users: ['Researchers', 'PhD students', 'Lab technicians']
    },
    { 
      level: 9, 
      name: 'Lecture Theatres & Seminar Rooms', 
      color: '#059669',
      description: 'Modern teaching spaces with integrated AV and recording capabilities',
      smartFeatures: ['Auto-configured AV systems', 'Lecture capture', 'Interactive displays', 'Room booking panels'],
      keyAreas: ['200-seat lecture theatre', 'Seminar rooms', 'Breakout spaces'],
      users: ['Students', 'Educators', 'Visiting speakers']
    },
    { 
      level: 8, 
      name: 'UCL Entrance & Student Hub', 
      color: '#059669',
      description: 'Dedicated UCL entrance with student amenities and study spaces',
      smartFeatures: ['Student ID access', 'Locker management', 'Study space booking', 'Digital noticeboards'],
      keyAreas: ['Student reception', 'Study pods', 'Café area', 'Lockers'],
      users: ['Students', 'UCL staff', 'Visitors']
    },
    { 
      level: 7, 
      name: 'Private Patient Suite', 
      color: '#7C3AED',
      description: 'Premium private patient facilities with enhanced amenities',
      smartFeatures: ['Personalised room controls', 'Premium wayfinding', 'Concierge services', 'Entertainment systems'],
      keyAreas: ['Private consultation rooms', 'VIP waiting', 'Recovery suites'],
      users: ['Private patients', 'Consultants', 'Concierge staff']
    },
    { 
      level: 6, 
      name: 'MDT & Conference Facilities', 
      color: '#D97706',
      description: 'Collaboration spaces for multidisciplinary team meetings',
      smartFeatures: ['Video conferencing', 'Digital whiteboards', 'Hybrid meeting support', 'Catering integration'],
      keyAreas: ['MDT rooms', 'Board room', 'Training suites', 'Hot desks'],
      users: ['Clinical teams', 'Management', 'External partners']
    },
    { 
      level: 5, 
      name: 'Diagnostic Imaging', 
      color: '#0891B2',
      description: 'Advanced imaging suite with integrated diagnostic equipment',
      smartFeatures: ['Equipment scheduling', 'Image integration to EPR', 'Patient flow tracking', 'Results notification'],
      keyAreas: ['OCT suites', 'Imaging rooms', 'Reading stations'],
      users: ['Patients', 'Imaging technicians', 'Clinicians']
    },
    { 
      level: 4, 
      name: 'Outpatient Clinics', 
      color: '#0891B2',
      description: 'High-volume outpatient services with optimised patient flow',
      smartFeatures: ['Self-check-in kiosks', 'Queue management', 'Clinic dashboards', 'Real-time wayfinding'],
      keyAreas: ['Consultation rooms', 'Waiting areas', 'Treatment rooms', 'Nursing stations'],
      users: ['Outpatients', 'Consultants', 'Nurses', 'HCAs']
    },
    { 
      level: 3, 
      name: 'Day Surgery & Theatres', 
      color: '#DC2626',
      description: 'Modern surgical facilities with integrated theatre systems',
      smartFeatures: ['Theatre scheduling', 'Surgical checklists', 'Equipment tracking', 'Recovery monitoring'],
      keyAreas: ['Operating theatres', 'Pre-op', 'Recovery', 'Sterilisation'],
      users: ['Surgical patients', 'Surgeons', 'Anaesthetists', 'Theatre staff']
    },
    { 
      level: 2, 
      name: 'Emergency Eye Care', 
      color: '#DC2626',
      description: '24/7 emergency eye services with rapid triage',
      smartFeatures: ['Priority check-in', 'Triage system', 'Urgent alerts', 'Capacity monitoring'],
      keyAreas: ['Triage', 'Treatment bays', 'Urgent care rooms', 'Waiting area'],
      users: ['Emergency patients', 'A&E clinicians', 'Triage nurses']
    },
    { 
      level: 1, 
      name: 'Main Entrance & Reception', 
      color: '#1D4ED8',
      description: 'Primary entrance with visitor management and wayfinding hub',
      smartFeatures: ['Visitor management', 'Self-check-in', 'Digital signage', 'Wayfinding kiosks'],
      keyAreas: ['Main reception', 'Waiting area', 'Information desk', 'Retail'],
      users: ['All visitors', 'Patients', 'Reception staff']
    },
    { 
      level: 0, 
      name: 'Pharmacy & Facilities', 
      color: '#6B7280',
      description: 'Outpatient pharmacy and building support services',
      smartFeatures: ['Prescription tracking', 'Collection notifications', 'Inventory management', 'Facilities monitoring'],
      keyAreas: ['Outpatient pharmacy', 'FM hub', 'Loading bay', 'Plant rooms'],
      users: ['Patients', 'Pharmacy staff', 'Facilities team']
    }
  ];

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => setShowIntro(false), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / 80, 1);
      setScrolled(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleJourneySelect = (journeyKey) => {
    setActiveJourney(journeyKey);
    setActiveView('journey');
    setJourneyStep(0);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const nextStep = () => {
    if (activeJourney && journeyStep < journeys[activeJourney].steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setJourneyStep(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevStep = () => {
    if (journeyStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setJourneyStep(prev => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  // Intro Animation
  if (showIntro) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center overflow-hidden">
        <div className="text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-rose-500/20 blur-3xl animate-pulse" />
          <div className="relative">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center animate-bounce">
                <span className="text-3xl">👁️</span>
              </div>
            </div>
            <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-400 bg-clip-text text-transparent">
                ORIEL
              </span>
            </h1>
            <p className="text-xl text-slate-300 font-light tracking-widest uppercase">
              Smart Services Experience
            </p>
            <div className="mt-8 flex justify-center gap-2">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');
        
        .mono { font-family: 'Space Mono', monospace; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes path-draw {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-gradient { 
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        .animate-slide-up { animation: slide-up 0.5s ease-out forwards; }
        
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        
        .step-line {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: path-draw 2s ease forwards;
        }
        
        .glow-cyan { box-shadow: 0 0 40px rgba(8, 145, 178, 0.4); }
        .glow-violet { box-shadow: 0 0 40px rgba(124, 58, 237, 0.4); }
        .glow-rose { box-shadow: 0 0 40px rgba(220, 38, 38, 0.4); }
        .glow-emerald { box-shadow: 0 0 40px rgba(5, 150, 105, 0.4); }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(148, 163, 184, 0.15)' }}>
        <div className="max-w-7xl mx-auto px-6" style={{ paddingTop: `${16 - scrolled * 4}px`, paddingBottom: `${16 - scrolled * 4}px`, transition: 'padding 0.15s ease' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4" style={{ opacity: 1 - scrolled, maxWidth: scrolled > 0.95 ? '0px' : '400px', overflow: 'hidden', transition: 'opacity 0.2s ease, max-width 0.3s ease' }}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">👁️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight whitespace-nowrap">
                  <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                    ORIEL
                  </span>
                  <span className="text-slate-400 font-light ml-2">Smart Services</span>
                </h1>
                <p className="text-xs text-slate-500 mono">St Pancras Eye Care Centre 2027</p>
              </div>
            </div>
            
            <nav className="flex items-center" style={{ gap: `${8 + scrolled * 4}px`, transition: 'gap 0.2s ease' }}>
              {[
                { key: 'overview', label: 'Overview', icon: '🏠' },
                { key: 'journeys', label: 'Journeys', icon: '🚶' },
                { key: 'systems', label: 'Systems', icon: '⚙️' },
                { key: 'building', label: 'Building', icon: '🏢' }
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => setActiveView(item.key)}
                  className={`rounded-lg font-medium transition-all duration-300 ${
                    activeView === item.key || (activeView === 'journey' && item.key === 'journeys')
                      ? 'bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg shadow-cyan-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                  style={{
                    padding: `${8 + scrolled * 4}px ${16 + scrolled * 8}px`,
                    fontSize: `${14 + scrolled * 2}px`,
                    transition: 'padding 0.2s ease, font-size 0.2s ease',
                  }}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16 sm:h-20" />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Overview View */}
        {activeView === 'overview' && (
          <div className="space-y-12 animate-slide-up">
            {/* Hero Section */}
            <section className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-violet-500/20 to-rose-500/20 animate-gradient" />
              <div className="relative p-12 text-center">
                <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mb-6 mono">
                  OPENING 2027
                </span>
                <h2 className="text-5xl font-black mb-6 leading-tight">
                  Where <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-400 bg-clip-text text-transparent">Eye Care</span><br />
                  Meets <span className="bg-gradient-to-r from-violet-400 to-rose-400 bg-clip-text text-transparent">Innovation</span>
                </h2>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                  Experience the future of eye care at Oriel — a smart building where digital systems 
                  seamlessly guide patients, empower clinicians, and optimise every aspect of care delivery.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setActiveView('journeys')}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold hover:opacity-90 transition-opacity"
                  >
                    Explore Journeys
                  </button>
                  <button
                    onClick={() => setActiveView('systems')}
                    className="px-8 py-4 rounded-xl glass text-white font-semibold hover:bg-white/10 transition-colors"
                  >
                    View Smart Systems
                  </button>
                </div>
              </div>
            </section>

            {/* Key Stats */}
            <section className="grid grid-cols-4 gap-6">
              {[
                { value: '11', label: 'Building Levels', icon: '🏢', color: 'cyan' },
                { value: '6', label: 'Smart Services', icon: '⚙️', color: 'violet' },
                { value: '20+', label: 'Integrated Systems', icon: '🔗', color: 'rose' },
                { value: '24/7', label: 'Operations Centre', icon: '🎛️', color: 'emerald' }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="glass rounded-2xl p-6 text-center card-hover"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <span className="text-4xl mb-3 block">{stat.icon}</span>
                  <div className={`text-4xl font-black bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-500 bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </section>

            {/* Innovation Levels */}
            <section className="glass rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">📊</span>
                Innovation Levels
              </h3>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { level: 'Digital', status: 'Essential', mgmt: 'Reactive', desc: 'Core standalone functionality with modern interfaces', color: 'slate', icon: '💻' },
                  { level: 'Smart', status: 'Enhanced', mgmt: 'Proactive', desc: 'Connected systems with automation and data sharing', color: 'cyan', icon: '🔗', highlight: true },
                  { level: 'Intelligent', status: 'Optimal', mgmt: 'Predictive', desc: 'Self-managing systems with AI and machine learning', color: 'violet', icon: '🧠' }
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl p-6 transition-all ${
                      item.highlight 
                        ? 'bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border-2 border-cyan-500/30' 
                        : 'bg-slate-800/50 border border-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{item.icon}</span>
                      <div>
                        <h4 className="text-lg font-bold">{item.level}</h4>
                        <span className="text-xs text-slate-400 mono">{item.status} • {item.mgmt}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300">{item.desc}</p>
                    {item.highlight && (
                      <span className="inline-block mt-4 px-3 py-1 rounded-full text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        Day 1 Target
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Journey Preview */}
            <section>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-rose-500 flex items-center justify-center">🚶</span>
                User Journeys
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(journeys).map(([key, journey]) => (
                  <button
                    key={key}
                    onClick={() => handleJourneySelect(key)}
                    className={`glass rounded-2xl p-6 text-left card-hover group`}
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${journey.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <span className="text-2xl">{journey.icon}</span>
                    </div>
                    <h4 className="text-lg font-bold mb-1">{journey.title}</h4>
                    <p className="text-sm text-slate-400 mb-3">{journey.persona}</p>
                    <p className="text-xs text-slate-500">{journey.steps.length} touchpoints</p>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Journeys Selection View */}
        {activeView === 'journeys' && (
          <div className="animate-slide-up">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4">
                Choose Your <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Journey</span>
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                Explore how different users will experience the smart building from arrival to departure
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              {Object.entries(journeys).map(([key, journey]) => (
                <button
                  key={key}
                  onClick={() => handleJourneySelect(key)}
                  className="glass rounded-3xl p-8 text-left card-hover group relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${journey.gradient} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${journey.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <span className="text-4xl">{journey.icon}</span>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs mono bg-slate-800 text-slate-400">
                        {journey.steps.length} steps
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{journey.title}</h3>
                    <p className="text-lg text-slate-300 mb-2">{journey.persona}</p>
                    <p className="text-sm text-slate-500 mb-6">{journey.description}</p>
                    
                    <div className="flex items-center gap-2">
                      {journey.steps.slice(0, 5).map((step, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sm"
                          title={step.title}
                        >
                          {step.icon}
                        </div>
                      ))}
                      {journey.steps.length > 5 && (
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-xs text-slate-500">
                          +{journey.steps.length - 5}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Journey Detail View */}
        {activeView === 'journey' && activeJourney && (
          <div className="animate-slide-up">
            {/* Journey Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveView('journeys')}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  ←
                </button>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${journeys[activeJourney].gradient} flex items-center justify-center`}>
                  <span className="text-3xl">{journeys[activeJourney].icon}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{journeys[activeJourney].title}</h2>
                  <p className="text-slate-400">{journeys[activeJourney].persona} — {journeys[activeJourney].description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mono text-sm">
                <span className="text-slate-500">Step</span>
                <span className="text-2xl font-bold">{journeyStep + 1}</span>
                <span className="text-slate-500">of {journeys[activeJourney].steps.length}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center gap-2">
                {journeys[activeJourney].steps.map((step, i) => (
                  <button
                    key={i}
                    onClick={() => { setIsAnimating(true); setTimeout(() => { setJourneyStep(i); setIsAnimating(false); }, 300); }}
                    className={`flex-1 group relative`}
                  >
                    <div className={`h-2 rounded-full transition-all ${
                      i <= journeyStep
                        ? `bg-gradient-to-r ${journeys[activeJourney].gradient}`
                        : 'bg-slate-700'
                    }`} />
                    <div className={`absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all ${
                      i === journeyStep
                        ? 'bg-white border-white scale-125'
                        : i < journeyStep
                        ? `bg-gradient-to-r ${journeys[activeJourney].gradient} border-transparent`
                        : 'bg-slate-800 border-slate-600'
                    }`}>
                      {i === journeyStep && (
                        <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-50" />
                      )}
                    </div>
                    <span className={`absolute top-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap transition-opacity ${
                      i === journeyStep ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                    }`}>
                      {step.icon}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              {(() => {
                const step = journeys[activeJourney].steps[journeyStep];
                return (
                  <div className="grid grid-cols-3 gap-6">
                    {/* Main Step Card */}
                    <div className="col-span-2 glass rounded-3xl p-8">
                      <div className="flex items-start gap-6 mb-8">
                        <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${journeys[activeJourney].gradient} flex items-center justify-center flex-shrink-0`}>
                          <span className="text-5xl">{step.icon}</span>
                        </div>
                        <div>
                          <span className="text-sm text-slate-500 mono">{step.time}</span>
                          <h3 className="text-3xl font-bold mt-1">{step.title}</h3>
                          <p className="text-slate-400 mt-2 flex items-center gap-2">
                            <span>📍</span> {step.location}
                          </p>
                        </div>
                      </div>
                      
                      <div className="p-6 rounded-2xl bg-slate-800/50 mb-6">
                        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Physical Experience</h4>
                        <p className="text-lg">{step.physical}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-cyan-500/20 flex items-center justify-center">💻</span>
                          Digital Touchpoints
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {step.digital.map((item, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20"
                            >
                              <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                                ✓
                              </span>
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Background Systems */}
                    <div className="space-y-6">
                      <div className="glass rounded-2xl p-6">
                        <h4 className="text-sm font-semibold text-violet-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-violet-500/20 flex items-center justify-center">🔮</span>
                          Behind the Scenes
                        </h4>
                        <div className="space-y-3">
                          {step.background.map((item, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-3 p-3 rounded-lg bg-violet-500/10 border border-violet-500/20"
                            >
                              <span className="w-6 h-6 rounded bg-violet-500/20 flex items-center justify-center text-violet-400 text-xs flex-shrink-0 mt-0.5">
                                ⚡
                              </span>
                              <span className="text-sm text-slate-300">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Navigation */}
                      <div className="flex gap-3">
                        <button
                          onClick={prevStep}
                          disabled={journeyStep === 0}
                          className={`flex-1 py-4 rounded-xl font-semibold transition-all ${
                            journeyStep === 0
                              ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                              : 'glass hover:bg-white/10'
                          }`}
                        >
                          ← Previous
                        </button>
                        <button
                          onClick={nextStep}
                          disabled={journeyStep === journeys[activeJourney].steps.length - 1}
                          className={`flex-1 py-4 rounded-xl font-semibold transition-all ${
                            journeyStep === journeys[activeJourney].steps.length - 1
                              ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                              : `bg-gradient-to-r ${journeys[activeJourney].gradient} hover:opacity-90`
                          }`}
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* Systems View */}
        {activeView === 'systems' && (
          <div className="animate-slide-up">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Smart Systems</span>
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                Six core digital capabilities that transform the building experience
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-12">
              {Object.entries(smartSystems).map(([key, system]) => (
                <div
                  key={key}
                  className={`glass rounded-2xl p-6 card-hover cursor-pointer transition-all ${
                    activeHotspot === key ? 'ring-2 ring-white/50' : ''
                  }`}
                  onClick={() => setActiveHotspot(activeHotspot === key ? null : key)}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${system.color}20` }}
                  >
                    <span className="text-3xl">{system.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{system.title}</h3>
                  <p className="text-sm text-slate-400 mb-4">{system.description}</p>
                  
                  {activeHotspot === key && (
                    <div className="animate-slide-up">
                      <div className="border-t border-slate-700 pt-4 mt-4">
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Key Features</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {system.features.map((feature, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 rounded text-xs bg-slate-800 text-slate-300"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Integration</h4>
                        <p className="text-xs text-slate-400">{system.integration}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Integration Architecture */}
            <div className="glass rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">🔗</span>
                Integration Architecture
              </h3>
              <div className="grid grid-cols-5 gap-4">
                {/* IOP */}
                <div className="col-span-5 glass rounded-2xl p-6 text-center bg-gradient-to-r from-slate-800 to-slate-700">
                  <h4 className="font-bold text-lg mb-2">Integration & Orchestration Platform (IOP)</h4>
                  <p className="text-sm text-slate-400">Central hub connecting all smart building and smart services systems</p>
                </div>
                
                {/* Connection Layer */}
                <div className="col-span-5 flex justify-around py-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-px h-8 bg-gradient-to-b from-cyan-500 to-transparent" />
                  ))}
                </div>
                
                {/* Smart Building */}
                <div className="col-span-2 glass rounded-2xl p-4">
                  <h4 className="font-semibold mb-3 text-cyan-400">Smart Building</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {['BMS', 'IoT Sensors', 'RTLS', 'Access Control', 'CCTV', 'Lighting'].map(item => (
                      <div key={item} className="px-2 py-1 rounded bg-cyan-500/10 text-center">{item}</div>
                    ))}
                  </div>
                </div>
                
                {/* HIE */}
                <div className="glass rounded-2xl p-4 text-center">
                  <h4 className="font-semibold mb-3 text-rose-400">HIE</h4>
                  <div className="text-xs space-y-2">
                    <div className="px-2 py-1 rounded bg-rose-500/10">EPR</div>
                    <div className="px-2 py-1 rounded bg-rose-500/10">PAS</div>
                  </div>
                </div>
                
                {/* Smart Services */}
                <div className="col-span-2 glass rounded-2xl p-4">
                  <h4 className="font-semibold mb-3 text-violet-400">Smart Services</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {['Wayfinding', 'Signage', 'Check-in', 'Room Booking', 'Visitor Mgmt', 'Ops Centre'].map(item => (
                      <div key={item} className="px-2 py-1 rounded bg-violet-500/10 text-center">{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Building View */}
        {activeView === 'building' && (
          <div className="animate-slide-up">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Building Overview</span>
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                11 levels of integrated care, research, and education — click any floor to explore
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Building Visualization */}
              <div className="col-span-2 glass rounded-3xl p-8">
                <div className="space-y-2">
                  {buildingLevels.map((floor, i) => (
                    <div
                      key={floor.level}
                      onClick={() => setSelectedFloor(selectedFloor === floor.level ? null : floor.level)}
                      className={`group relative flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer ${
                        selectedFloor === floor.level 
                          ? 'bg-white/10 ring-2' 
                          : 'hover:bg-white/5'
                      }`}
                      style={{ 
                        animationDelay: `${i * 50}ms`,
                        ringColor: selectedFloor === floor.level ? floor.color : 'transparent'
                      }}
                    >
                      <div
                        className={`w-16 h-12 rounded-lg flex items-center justify-center text-lg font-bold mono transition-transform ${
                          selectedFloor === floor.level ? 'scale-110' : ''
                        }`}
                        style={{ backgroundColor: `${floor.color}30`, color: floor.color }}
                      >
                        L{floor.level}
                      </div>
                      <div
                        className="flex-1 h-12 rounded-lg relative overflow-hidden"
                        style={{ backgroundColor: `${floor.color}15` }}
                      >
                        <div
                          className="absolute left-0 top-0 bottom-0 rounded-lg transition-all group-hover:w-full"
                          style={{ 
                            backgroundColor: `${floor.color}30`,
                            width: selectedFloor === floor.level ? '100%' : `${80 + Math.random() * 20}%`
                          }}
                        />
                        <span className="absolute inset-0 flex items-center px-4 text-sm font-medium">
                          {floor.name}
                        </span>
                      </div>
                      <div className={`transition-all ${selectedFloor === floor.level ? 'rotate-180' : ''}`}>
                        <span className="text-slate-400">▼</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Side Panel - Shows selected floor or legend */}
              <div className="space-y-6">
                {selectedFloor !== null ? (
                  // Selected Floor Details
                  (() => {
                    const floor = buildingLevels.find(f => f.level === selectedFloor);
                    return (
                      <div className="animate-slide-up">
                        <div 
                          className="glass rounded-2xl p-6 border-2"
                          style={{ borderColor: `${floor.color}50` }}
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold mono"
                              style={{ backgroundColor: `${floor.color}30`, color: floor.color }}
                            >
                              L{floor.level}
                            </div>
                            <div>
                              <h4 className="font-bold">{floor.name}</h4>
                              <button 
                                onClick={() => setSelectedFloor(null)}
                                className="text-xs text-slate-500 hover:text-white"
                              >
                                ✕ Close
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-slate-300 mb-4">{floor.description}</p>
                          
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Smart Features</h5>
                              <div className="flex flex-wrap gap-2">
                                {floor.smartFeatures.map((feature, i) => (
                                  <span 
                                    key={i}
                                    className="px-2 py-1 rounded text-xs"
                                    style={{ backgroundColor: `${floor.color}20`, color: floor.color }}
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Key Areas</h5>
                              <div className="grid grid-cols-2 gap-1 text-xs text-slate-400">
                                {floor.keyAreas.map((area, i) => (
                                  <div key={i} className="flex items-center gap-1">
                                    <span style={{ color: floor.color }}>•</span> {area}
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Primary Users</h5>
                              <div className="flex flex-wrap gap-2">
                                {floor.users.map((user, i) => (
                                  <span 
                                    key={i}
                                    className="px-2 py-1 rounded-full text-xs bg-slate-800 text-slate-300"
                                  >
                                    {user}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="glass rounded-2xl p-4 mt-4">
                          <p className="text-xs text-slate-500 text-center">
                            💡 Click another floor to compare, or click the same floor to close
                          </p>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  // Default Legend
                  <>
                    <div className="glass rounded-2xl p-6">
                      <h4 className="font-bold mb-4">Area Types</h4>
                      <div className="space-y-3">
                        {[
                          { color: '#059669', label: 'UCL Research & Education' },
                          { color: '#7C3AED', label: 'Private Patient Suite' },
                          { color: '#D97706', label: 'Conference & MDT' },
                          { color: '#0891B2', label: 'Clinical Services' },
                          { color: '#DC2626', label: 'Surgery & Emergency' },
                          { color: '#1D4ED8', label: 'Central Operations' }
                        ].map(item => (
                          <div key={item.label} className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
                            <span className="text-sm">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass rounded-2xl p-6">
                      <h4 className="font-bold mb-4">Smart Features Throughout</h4>
                      <div className="space-y-2 text-sm text-slate-400">
                        <div className="flex items-center gap-2"><span>📡</span> Wi-Fi 6E Coverage</div>
                        <div className="flex items-center gap-2"><span>🌡️</span> Climate Control Zones</div>
                        <div className="flex items-center gap-2"><span>💡</span> Circadian Lighting</div>
                        <div className="flex items-center gap-2"><span>🔒</span> Access Control Points</div>
                        <div className="flex items-center gap-2"><span>📺</span> Digital Signage Displays</div>
                        <div className="flex items-center gap-2"><span>📍</span> RTLS Tracking</div>
                      </div>
                    </div>

                    <div className="glass rounded-2xl p-6 bg-gradient-to-br from-cyan-500/10 to-violet-500/10">
                      <h4 className="font-bold mb-2">NHS Net Zero</h4>
                      <p className="text-sm text-slate-400 mb-4">
                        Smart systems contribute to 2030 sustainability targets
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🌱</span>
                        <span className="text-xs text-slate-500">Energy-optimized operations</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
                  <span>👁️</span>
                </div>
                <span className="font-semibold">ORIEL</span>
              </div>
              <span className="text-slate-600">|</span>
              <span className="text-sm text-slate-500">Moorfields • UCL IoO • Moorfields Eye Charity</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <span>Smart Services Interactive Infographic</span>
              <span className="mono">v1.2</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OrielSmartServicesInfographic;
