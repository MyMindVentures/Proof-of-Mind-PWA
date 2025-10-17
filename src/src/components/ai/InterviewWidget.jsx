// Interview Widget
// Shows local video preview and controls AI Interviewer

import React, { useEffect, useRef, useState } from 'react';
import { Camera, Mic, MicOff, Play, StopCircle, Video, VideoOff } from 'lucide-react';
import aiInterviewerService from '../../services/aiInterviewerService';

const PROFILES = [
  { id: 'press', label: 'Press' },
  { id: 'investor', label: 'Investor' },
  { id: 'community', label: 'Community' },
  { id: 'expert', label: 'Expert' },
  { id: 'revenue', label: 'Revenue' },
];

const InterviewWidget = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [recording, setRecording] = useState(false);
  const [profile, setProfile] = useState('press');
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const init = async () => {
      try {
        const initialized = await aiInterviewerService.initialize();
        if (initialized?.success) setReady(true);
        const { success, stream } = await aiInterviewerService.initializeMediaRecorder();
        if (success) {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play().catch(() => {});
          }
        }
      } catch (e) {
        setReady(false);
      }
    };
    init();
    return () => {
      const s = streamRef.current;
      if (s) s.getTracks().forEach(t => t.stop());
    };
  }, []);

  const toggleMic = () => {
    const s = streamRef.current;
    if (!s) return;
    s.getAudioTracks().forEach(t => (t.enabled = !t.enabled));
    setMicOn(prev => !prev);
  };

  const toggleCam = () => {
    const s = streamRef.current;
    if (!s) return;
    s.getVideoTracks().forEach(t => (t.enabled = !t.enabled));
    setCamOn(prev => !prev);
  };

  const startInterview = async () => {
    setStatus('starting');
    const res = await aiInterviewerService.startInterview(profile);
    if (res?.success) {
      setRecording(true);
      setStatus('recording');
    } else {
      setStatus('error');
    }
  };

  const stopInterview = async () => {
    setStatus('stopping');
    await aiInterviewerService.endInterview();
    setRecording(false);
    setStatus('idle');
  };

  return (
    <div className="bg-dark-800 border border-dark-700 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-dark-700">
        <div className="flex items-center space-x-2">
          <Camera className="w-4 h-4 text-primary-400" />
          <span className="text-sm text-gray-300">Interview</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            status === 'recording' ? 'bg-red-100 text-red-700' : status === 'starting' || status === 'stopping' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
          }`}>
            {status}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <select
            className="bg-dark-700 border border-dark-600 text-sm text-white rounded px-2 py-1"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            disabled={recording}
          >
            {PROFILES.map(p => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>
          <button onClick={toggleMic} className="p-2 rounded bg-dark-700 hover:bg-dark-600">
            {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>
          <button onClick={toggleCam} className="p-2 rounded bg-dark-700 hover:bg-dark-600">
            {camOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
          </button>
          {!recording ? (
            <button
              onClick={startInterview}
              disabled={!ready}
              className="px-3 py-1.5 rounded bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white flex items-center space-x-1"
            >
              <Play className="w-4 h-4" />
              <span>Start</span>
            </button>
          ) : (
            <button
              onClick={stopInterview}
              className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white flex items-center space-x-1"
            >
              <StopCircle className="w-4 h-4" />
              <span>Stop</span>
            </button>
          )}
        </div>
      </div>
      <div className="aspect-video bg-black">
        <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
      </div>
    </div>
  );
};

export default InterviewWidget;


