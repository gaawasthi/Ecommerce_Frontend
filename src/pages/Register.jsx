import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, verify } from '../features/auth/authSlice';

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await dispatch(register(form));

    if (result.meta.requestStatus === 'fulfilled') {
      setStep(2);
    } else {
      alert(result.payload?.message || 'Registration failed');
    }
  };

  const handleVerify = async () => {
    if (otp.length < 4) {
      alert('Enter a valid OTP');
      return;
    }

    const result = await dispatch(
      verify({
        email: form.email,
        otp,
      })
    );

    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/home');
    } else {
      alert(result.payload?.message || 'Invalid OTP');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-xl">
        
        {/* Step Indicators */}
        <div className="flex items-center justify-center mb-10 gap-4">
          {[1, 2].map((num, idx) => (
            <React.Fragment key={num}>
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold text-white transition-all ${
                  step >= num ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                {step > num ? <Check size={20} /> : num}
              </div>
              {idx === 0 && (
                <div
                  className={`h-1 w-24 rounded ${
                    step >= 2 ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* STEP 1: REGISTER */}
        {step === 1 && (
          <form onSubmit={handleRegister} className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-800">
              Create Your Account
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
                className="border px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
                className="border px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="border px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                className="border px-4 py-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 hover:bg-blue-700 transition-all shadow-md"
            >
              Continue <ArrowRight size={20} />
            </button>

            <p className="text-center text-gray-700">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-blue-600 font-medium hover:underline"
              >
                Login here
              </button>
            </p>
          </form>
        )}

        {/* STEP 2: OTP VERIFY */}
        {step === 2 && (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Verify OTP</h2>

            <p className="text-gray-600">
              Enter the verification code sent to <strong>{form.email}</strong>
            </p>

            <input
              type="text"
              value={otp}
              maxLength="6"
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) setOtp(e.target.value);
              }}
              placeholder="Enter OTP"
              className="w-full text-center text-xl font-semibold border-2 border-gray-300 rounded-xl py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              onClick={handleVerify}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md"
            >
              Verify & Continue
            </button>

            <button
              onClick={() => setStep(1)}
              className="text-blue-600 font-medium hover:underline"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
