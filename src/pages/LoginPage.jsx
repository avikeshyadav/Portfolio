import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const initialState = { name: "", email: "", password: "", captcha: "", pin: "" };

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [captcha, setCaptcha] = useState({ token: "", value: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [useFaceLogin, setUseFaceLogin] = useState(false);
  const [faceReady, setFaceReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const loadCaptcha = async () => {
    try {
      const response = await fetch("/api/captcha");
      const data = await response.json();
      setCaptcha({ token: data.token, value: data.captcha });
    } catch (err) {
      console.error(err);
      setError("Backend is not reachable. Start the backend server first.");
    }
  };

  useEffect(() => {
    loadCaptcha();
  }, []);

  useEffect(() => {
    if (!useFaceLogin) return;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setFaceReady(true);
        }
      } catch (err) {
        console.error(err);
        setError("Camera access is not available. Please allow camera access.");
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [useFaceLogin]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const captureFaceImage = () => {
    if (!videoRef.current || !canvasRef.current) return null;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth || 320;
    canvas.height = video.videoHeight || 240;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png");
  };

  const handleFaceLogin = async () => {
    if (!useFaceLogin) return false;

    setIsCapturing(true);
    setError("");
    setSuccess("");

    try {
      const image = captureFaceImage();
      if (!image) {
        throw new Error("Camera not ready");
      }

      const verifyResponse = await fetch("/api/face/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });

      const verifyData = await verifyResponse.json();

      if (verifyResponse.ok && verifyData.ok) {
        setSuccess(`Face matched successfully for ${verifyData.name} (${verifyData.confidence})`);
        return true;
      }

      if (verifyData.message && (verifyData.message.includes("No registered faces") || verifyData.message.includes("not recognized"))) {
        const registerResponse = await fetch("/api/face/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.email || "User",
            image,
          }),
        });

        const registerData = await registerResponse.json();
        if (!registerResponse.ok || !registerData.ok) {
          setError(registerData.message || "Face registration failed.");
          return false;
        }

        setSuccess("Face registered successfully. You can try verifying again.");
        return false;
      }

      setError(verifyData.message || "Face verification failed.");
      return false;
    } catch (err) {
      setError("Face verification failed. Make sure the Python backend is running.");
      return false;
    } finally {
      setIsCapturing(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email || !formData.password || !formData.captcha) {
      setError("Please fill all fields including captcha.");
      return;
    }

    if (useFaceLogin && (!formData.pin || formData.pin.length < 4)) {
      setError("Face login requires a 4-digit PIN.");
      return;
    }

    if (useFaceLogin) {
      const faceOk = await handleFaceLogin();
      if (!faceOk) {
        return;
      }
    }

    const payload = {
      ...formData,
      token: captcha.token,
      captcha: formData.captcha,
      useFaceLogin,
    };

    try {
      const endpoint = isRegister ? "/api/register" : "/api/login";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Authentication failed.");
        return;
      }

      setSuccess(data.message || "Success");
      document.cookie = `auth_user=${encodeURIComponent(JSON.stringify(data.user || {}))}; path=/; max-age=86400`;
      onLogin();
      navigate("/dashboard");
    } catch (err) {
      setError("Server connection failed. Start the backend first.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-cyan-400">{isRegister ? "Register" : "Login"}</h1>
          <p className="mt-2 text-sm text-slate-400">
            {isRegister ? "Create a new account" : "Sign in to access your dashboard"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister ? (
            <div>
              <label className="mb-2 block text-sm text-slate-300" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
                placeholder="Your name"
              />
            </div>
          ) : null}

          <div>
            <label className="mb-2 block text-sm text-slate-300" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
              placeholder="Enter password"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300" htmlFor="captcha">
              Captcha
            </label>
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-4 py-3 text-lg font-semibold text-cyan-300">
                {captcha.value}
              </div>
              <button
                type="button"
                onClick={loadCaptcha}
                className="rounded-lg border border-slate-700 bg-slate-800 p-3 text-cyan-400 hover:border-cyan-500"
                aria-label="Refresh captcha"
              >
                ↻
              </button>
              <input
                id="captcha"
                name="captcha"
                type="text"
                value={formData.captcha}
                onChange={handleChange}
                className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
                placeholder="Enter captcha"
              />
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
            <label className="flex items-center gap-3 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={useFaceLogin}
                onChange={() => setUseFaceLogin((prev) => !prev)}
                className="h-4 w-4 rounded border-slate-600 bg-slate-800"
              />
              Enable Face Login
            </label>
            {useFaceLogin ? (
              <div className="mt-3 space-y-3">
                <label className="mb-2 block text-sm text-slate-300" htmlFor="pin">
                  4-digit PIN
                </label>
                <input
                  id="pin"
                  name="pin"
                  type="password"
                  maxLength={4}
                  value={formData.pin}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
                  placeholder="Enter your PIN"
                />
                <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm text-slate-300">Live camera</p>
                    <span className="text-xs text-cyan-400">{faceReady ? "Ready" : "Waiting"}</span>
                  </div>
                  <video ref={videoRef} autoPlay muted playsInline className="h-44 w-full rounded-lg bg-black object-cover" />
                  <canvas ref={canvasRef} className="hidden" />
                  <button
                    type="button"
                    onClick={handleFaceLogin}
                    disabled={isCapturing}
                    className="mt-3 w-full rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isCapturing ? "Verifying..." : "Verify Face"}
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          {error ? <p className="text-sm text-rose-400">{error}</p> : null}
          {success ? <p className="text-sm text-emerald-400">{success}</p> : null}

          <button
            type="submit"
            className="w-full rounded-full bg-cyan-500 px-4 py-3 font-semibold text-white transition hover:bg-cyan-600"
          >
            {isRegister ? "Create Account" : "Login"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
          <button type="button" onClick={() => setIsRegister((prev) => !prev)} className="text-cyan-400 hover:underline">
            {isRegister ? "Already have an account? Login" : "Create new account"}
          </button>
          <Link to="/" className="hover:text-cyan-400">
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
