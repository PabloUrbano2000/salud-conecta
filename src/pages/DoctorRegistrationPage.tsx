import { Link, useNavigate } from "react-router";
import { specialties } from "../data/mockData";

const fieldClassName =
  "mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100";

function Logo() {
  return (
    <Link className="flex items-center gap-3 text-slate-900 no-underline" to="/">
      <span className="grid size-10 place-items-center rounded-xl bg-cyan-600 text-xl font-semibold text-white shadow-sm">+</span>
      <span className="text-xl font-semibold tracking-tight">SaludConecta</span>
    </Link>
  );
}

function DoctorRegistrationPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-svh bg-slate-50 px-5 py-6 sm:px-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.85fr)] lg:p-0">
      <section className="mx-auto flex w-full max-w-xl flex-col lg:mx-0 lg:max-w-none lg:bg-white lg:px-[clamp(2.5rem,8vw,9rem)] lg:py-10">
        <Logo />
        <div className="my-10 lg:my-auto lg:py-12">
          <Link className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-cyan-700" to="/login">
            <span aria-hidden="true">←</span> Volver al inicio de sesión
          </Link>
          <div className="mt-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-bold tracking-wide text-cyan-700">
              <span className="size-1.5 rounded-full bg-cyan-600" /> PERFIL PROFESIONAL
            </span>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Únete como doctor</h1>
            <p className="mt-3 max-w-lg text-base leading-7 text-slate-600">
              Completa tus datos profesionales. Verificaremos tu colegiatura antes de publicar tu perfil.
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={(event) => { event.preventDefault(); navigate("/registro-doctor/pendiente"); }}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">Nombres<input className={fieldClassName} placeholder="Ej. Valeria" type="text" /></label>
              <label className="block text-sm font-medium text-slate-700">Apellidos<input className={fieldClassName} placeholder="Ej. Mendoza Rojas" type="text" /></label>
            </div>
            <label className="block text-sm font-medium text-slate-700">Correo profesional<input className={fieldClassName} placeholder="nombre@correo.com" type="email" /></label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">CMP<input className={fieldClassName} placeholder="Ej. CMP 12345" type="text" /></label>
              <label className="block text-sm font-medium text-slate-700">Especialidad<select className={fieldClassName} defaultValue=""><option disabled value="">Selecciona una opción</option>{specialties.filter((specialty) => specialty.active).map((specialty) => <option key={specialty.name}>{specialty.name}</option>)}</select></label>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="font-semibold text-slate-900">Datos del consultorio</h2>
              <div className="mt-4 space-y-4">
                <label className="block text-sm font-medium text-slate-700">Nombre del consultorio<input className={fieldClassName} placeholder="Ej. Consultorio San Felipe" type="text" /></label>
                <label className="block text-sm font-medium text-slate-700">Dirección o distrito<input className={fieldClassName} placeholder="Ej. Jesús María, Lima" type="text" /></label>
                <label className="block text-sm font-medium text-slate-700">Modalidad<select className={fieldClassName} defaultValue=""><option disabled value="">Selecciona una opción</option><option>Presencial</option><option>Virtual</option><option>Presencial y virtual</option></select></label>
              </div>
            </div>
            <div className="space-y-3">
              <label className="flex items-start gap-3 text-sm leading-5 text-slate-600">
                <input className="mt-0.5 size-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500" type="checkbox" />
                <span>Acepto los términos y condiciones y la política de privacidad de SaludConecta.</span>
              </label>
              <label className="flex items-start gap-3 text-sm leading-5 text-slate-600">
                <input className="mt-0.5 size-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500" type="checkbox" />
                <span>Declaro que la información profesional y el CMP proporcionados son correctos.</span>
              </label>
            </div>
            <button className="w-full rounded-xl bg-cyan-600 px-5 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200" type="submit">Enviar solicitud de validación</button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-600">¿Ya tienes una cuenta? <Link className="font-semibold text-cyan-700 hover:text-cyan-800" to="/login">Inicia sesión</Link></p>
        </div>
        <p className="text-sm text-slate-500">© 2026 SaludConecta. Tu salud, más cerca.</p>
      </section>
      <aside className="relative hidden overflow-hidden bg-cyan-700 p-12 lg:flex lg:flex-col lg:justify-center">
        <div className="absolute -right-16 -top-24 size-96 rounded-full bg-cyan-500/35" />
        <div className="relative max-w-md text-white"><div className="grid size-16 place-items-center rounded-2xl bg-white/15 text-3xl">✚</div><h2 className="mt-8 text-4xl font-semibold tracking-tight">Haz que tu atención llegue más lejos.</h2><p className="mt-5 text-lg leading-8 text-cyan-50">Conecta con nuevos pacientes y organiza tu disponibilidad desde un solo lugar.</p><div className="mt-10 rounded-2xl border border-white/15 bg-white/10 p-5 text-sm leading-6 text-cyan-50"><span className="font-semibold text-white">Validación profesional</span><br />Tu perfil será visible en la búsqueda una vez que tu colegiatura sea aprobada.</div></div>
      </aside>
    </main>
  );
}

export default DoctorRegistrationPage;
