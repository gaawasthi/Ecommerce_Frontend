import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/auth/authSlice';
const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.role === "admin") {
      navigate("/admin");
    }
  }, [user, navigate]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6, "Min 6 chars").required("Required"),
    }),
    onSubmit: async (values) => {
      const result = await dispatch(login(values));
      console.log(result);
      console.log(result.meta)
   
      
      
      
      if (result.meta.requestStatus === "fulfilled") {
        if (result.payload.user.role === "admin") {
          navigate("/admin");
        } else {
          alert("Access denied: You are not an admin!");
        }
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-sm border rounded-xl shadow-md p-6 space-y-5"
      >
        <h1 className="text-2xl font-semibold text-center mb-2">Admin Login</h1>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="admin@example.com"
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-sm text-red-600 mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded-lg text-white font-medium ${
            isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition`}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>

        {isError && (
          <p className="text-center text-sm text-red-600 mt-2">{message}</p>
        )}

        <p className="text-center text-sm text-gray-500">
          Need help? <span className="text-blue-600">support@admin.com</span>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
