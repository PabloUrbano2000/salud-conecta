import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";

function Logo() {
  return (
    <Link className="flex items-center gap-3 text-slate-900 no-underline" to="/">
      <span className="grid size-10 place-items-center rounded-xl bg-cyan-600 text-xl font-semibold text-white shadow-sm">
        +
      </span>
      <span className="text-xl font-semibold tracking-tight">SaludConecta</span>
    </Link>
  );
}

const fieldClassName =
  "mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100";

function PatientRegistrationPage() {
  const [registrationMethod, setRegistrationMethod] = useState<"email" | "phone">("email");
  const [contact, setContact] = useState("");
  const [duplicateContact, setDuplicateContact] = useState(false);
  const navigate = useNavigate();

  function handleContactChange(value: string) {
    setContact(value);
    setDuplicateContact(value.trim().toLowerCase() === "paciente@demo.com" || value.trim() === "999999999");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!duplicateContact) navigate("/registro/verificar");
  }

  return (
    <main className="min-h-svh bg-slate-50 px-5 py-6 sm:px-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.85fr)] lg:p-0">
      <section className="mx-auto flex w-full max-w-xl flex-col lg:mx-0 lg:max-w-none lg:bg-white lg:px-[clamp(2.5rem,8vw,9rem)] lg:py-10">
        <Logo />

        <div className="my-10 lg:my-auto lg:py-12">
          <Link
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-cyan-700"
            to="/login"
          >
            <span aria-hidden="true">←</span> Volver al inicio de sesión
          </Link>

          <div className="mt-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-bold tracking-wide text-cyan-700">
              <span className="size-1.5 rounded-full bg-cyan-600" /> CUENTA DE PACIENTE
            </span>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Crea tu cuenta
            </h1>
            <p className="mt-3 max-w-lg text-base leading-7 text-slate-600">
              Regístrate para buscar especialistas y gestionar tus citas médicas de forma sencilla.
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Nombres
                <input className={fieldClassName} placeholder="Ej. Ana María" type="text" />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Apellidos
                <input className={fieldClassName} placeholder="Ej. Torres Flores" type="text" />
              </label>
            </div>

            <label className="block text-sm font-medium text-slate-700">
              DNI
              <input className={fieldClassName} inputMode="numeric" placeholder="Ej. 74281963" type="text" />
            </label>

            <fieldset>
              <legend className="text-sm font-medium text-slate-700">¿Cómo prefieres registrarte?</legend>
              <div className="mt-2 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1.5">
                <button className={`rounded-lg px-3 py-2.5 text-sm font-semibold ${registrationMethod === "email" ? "bg-white text-cyan-700 shadow-sm" : "text-slate-500"}`} onClick={() => { setRegistrationMethod("email"); setContact(""); setDuplicateContact(false); }} type="button">
                  Correo electrónico
                </button>
                <button className={`rounded-lg px-3 py-2.5 text-sm font-semibold ${registrationMethod === "phone" ? "bg-white text-cyan-700 shadow-sm" : "text-slate-500"}`} onClick={() => { setRegistrationMethod("phone"); setContact(""); setDuplicateContact(false); }} type="button">
                  Teléfono
                </button>
              </div>
            </fieldset>

            <label className="block text-sm font-medium text-slate-700">
              {registrationMethod === "email" ? "Correo electrónico" : "Teléfono"}
              <input aria-describedby={duplicateContact ? "duplicate-contact" : undefined} className={`${fieldClassName} ${duplicateContact ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""}`} inputMode={registrationMethod === "phone" ? "tel" : undefined} onChange={(event) => handleContactChange(event.target.value)} placeholder={registrationMethod === "email" ? "nombre@correo.com" : "999 999 999"} type={registrationMethod === "email" ? "email" : "tel"} value={contact} />
              {duplicateContact ? <span className="mt-2 block text-sm font-normal leading-5 text-red-600" id="duplicate-contact">Este {registrationMethod === "email" ? "correo" : "teléfono"} ya está registrado. ¿Deseas <Link className="font-semibold underline" to="/login">iniciar sesión</Link>?</span> : <span className="mt-2 block text-xs font-normal leading-5 text-slate-500">Te enviaremos un código para verificar tu cuenta.</span>}
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Contraseña
              <input className={fieldClassName} placeholder="Crea una contraseña segura" type="password" />
            </label>

            <label className="flex items-start gap-3 text-sm leading-5 text-slate-600">
              <input className="mt-0.5 size-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500" type="checkbox" />
              <span>
                Acepto los términos de uso y la política de privacidad de SaludConecta.
              </span>
            </label>

            <button
              className="w-full rounded-xl bg-cyan-600 px-5 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200"
              type="submit"
            >
              Crear cuenta
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            ¿Ya tienes una cuenta?{" "}
            <Link className="font-semibold text-cyan-700 hover:text-cyan-800" to="/login">
              Inicia sesión
            </Link>
          </p>
        </div>

        <p className="text-sm text-slate-500">© 2026 SaludConecta. Tu salud, más cerca.</p>
      </section>

      <aside className="relative hidden overflow-hidden bg-cyan-700 p-12 lg:flex lg:flex-col lg:justify-center">
        <div className="absolute -right-16 -top-24 size-96 rounded-full bg-cyan-500/35" />
        <div className="absolute -bottom-28 -left-28 size-[28rem] rounded-full border-[42px] border-cyan-500/30" />
        <div className="relative max-w-md text-white">
          <div className="grid size-16 place-items-center rounded-2xl bg-white/15 text-3xl">♡</div>
          <h2 className="mt-8 text-4xl font-semibold tracking-tight">Tu salud, siempre más cerca.</h2>
          <p className="mt-5 text-lg leading-8 text-cyan-50">
            Encuentra atención médica confiable, elige el horario que mejor se adapte a ti y lleva el control de tus citas.
          </p>
          <div className="mt-10 space-y-4 text-sm text-cyan-50">
            {["Especialistas para cada necesidad", "Horarios que se adaptan a ti", "Tu información, en un solo lugar"].map((item) => (
              <div className="flex items-center gap-3" key={item}>
                <span className="grid size-5 place-items-center rounded-full bg-cyan-200 text-xs font-bold text-cyan-800">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </main>
  );
}

export default PatientRegistrationPage;
