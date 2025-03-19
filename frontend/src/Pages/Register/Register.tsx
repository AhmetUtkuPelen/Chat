import { useState } from "react"
import { useAuthenticationStore } from "../../Store/AuthenticationStore"
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react"
import { Link } from "react-router-dom";
import toast from "react-hot-toast";


const Register = () => {

  interface FormData {
    fullName: string,
    email: string,
    password: string
  }

  const [showMyPassword, setShowMyPassword] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>()
  

  const register = useAuthenticationStore(state => state.register);
  const isRegistering = useAuthenticationStore(state => state.isRegistering);



  // ? Validate Form ? \\
  const ValidateForm = () => {

    if(!formData?.fullName.trim()) return toast.error("Full Name Is Required !");

    if(!formData?.email.trim()) return toast.error("Email Is Required !");

    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid Email Format !");

    if(!formData?.password.trim()) return toast.error("Password Is Required !");

    if(formData?.password.length < 6) return toast.error("Password Must Be At Least 6 Characters Long !");

    return true;

  }
  // ? Validate Form ? \\


  // ? Submit Form ? \\
  const SubmitForm = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const successfulForm = ValidateForm();

    if(successfulForm === true && formData) register(formData)

  }
  // ? Submit Form ? \\



  return (
    <div className="min-h-screen grid">
      
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary"/>
              </div>
              <h1 className="text-2xl font-bold mt-2 text-blue-600">Create Account</h1>
              <p className="text-base-content/60">Connect With Your Friends and Stay In Touch</p>
            </div>
          </div>

          <form onSubmit={SubmitForm} className="space-y-6">
            
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg text-blue-600 font-bold">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40"/>
                </div>
                <input type="text" className="input input-bordered w-full pl-10" placeholder="Full Name" 
                  value={formData?.fullName || ''} 
                  onChange={(e) => setFormData(prev => ({
                    fullName: e.target.value,
                    email: prev?.email || '',
                    password: prev?.password || ''
                  }))}
                />
              </div>
            </div>

            <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg text-blue-600 font-bold">Email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="size-5 text-base-content/40"/>
                  </div>
                  <input type="email" className={`input input-bordered w-full pl-10`} placeholder="youremail@gmail.com" value={formData?.email || ''} onChange={(e) => setFormData(prev => ({
                    fullName: prev?.fullName || '',
                    email: e.target.value,
                    password: prev?.password || ''
                  }))} />
                </div>
            </div>

            <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg text-blue-600 font-bold">Password</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="size-5 text-base-content/40"/>
                  </div>
                  <input type={showMyPassword ? "text" : "password"} className={`input input-bordered w-full pl-10`} placeholder="...." value={formData?.password || ''} onChange={(e) => setFormData(prev => ({
                    fullName: prev?.fullName || '',
                    email: prev?.email || '',
                    password: e.target.value
                  }))}/>
                  <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() =>setShowMyPassword(!showMyPassword)}>
                    {showMyPassword ? (
                      <EyeOff className="size-5 text-base-content/40"/>
                    ) : (
                      <Eye className="size-5 text-base-content/40"/>
                    )}
                  </button>
                </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isRegistering}>
              {isRegistering ? (
                <>
                  <Loader2 className="size-5 animate-spin"/>
                </>
              ) : (
                "REGISTER"
              )}
            </button>

          </form>

            <div className="text-center">
              <p className="text-base-content/60">
                You Already Have Account? {""}
                <Link to={`/login`} className="link link-primary">
                  LOGIN
                </Link>
              </p>
            </div>

        </div>
      </div>

    </div>
  )
}

export default Register
