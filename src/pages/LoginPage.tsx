import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { setMockRole } from "../lib/mockSession";

type UserRole = "patient" | "doctor";

const roles: { id: UserRole; label: string; description: string }[] = [
  {
    id: "patient",
    label: "Soy paciente",
    description: "Agenda y consulta tus citas.",
  },
  {
    id: "doctor",
    label: "Soy doctor",
    description: "Gestiona tu agenda médica.",
  },
];

function Logo() {
  return (
    <Link className="flex items-center gap-3 text-slate-900 no-underline" to="/">
      <div className="grid size-10 place-items-center rounded-xl bg-cyan-600 text-xl font-semibold text-white shadow-sm">
        +
      </div>
      <span className="text-xl font-semibold tracking-tight">SaludConecta</span>
    </Link>
  );
}

function LoginPage() {
  const [role, setRole] = useState<UserRole>("patient");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const nextPage = searchParams.get("next");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMockRole(role);
    navigate(
      role === "patient" && nextPage
        ? nextPage
        : role === "patient"
          ? "/paciente"
          : "/doctor",
    );
  }

  return (
    <main className="min-h-svh bg-slate-50 px-5 py-6 sm:px-8 lg:grid lg:grid-cols-2 lg:p-0">
      <section className="mx-auto flex w-full max-w-md flex-col lg:mx-0 lg:max-w-none lg:justify-between lg:bg-white lg:px-[clamp(2rem,7vw,8rem)] lg:py-10">
        <Logo />

        <div className="my-12 lg:my-0">
          <p className="mb-3 text-sm font-semibold tracking-wide text-cyan-700">
            BIENVENIDO
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Ingresa a tu cuenta
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            {nextPage
              ? "Ingresa para confirmar y guardar tu cita médica."
              : "Accede para gestionar tus citas médicas de forma sencilla."}
          </p>

          <form className="mt-8" onSubmit={handleSubmit}>
            <fieldset>
              <legend className="text-sm font-medium text-slate-700">
                ¿Cómo deseas ingresar?
              </legend>
              <div
                className="mt-3 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1.5"
                role="radiogroup"
              >
                {roles.map((item) => {
                  const isSelected = role === item.id;

                  return (
                    <button
                      aria-checked={isSelected}
                      className={`rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${isSelected ? "bg-white text-cyan-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                      key={item.id}
                      onClick={() => setRole(item.id)}
                      role="radio"
                      type="button"
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-sm text-slate-500">
                {roles.find((item) => item.id === role)?.description}
              </p>
            </fieldset>

            <div className="mt-7 space-y-5">
              <label className="block text-sm font-medium text-slate-700">
                Correo electrónico
                <input
                  className="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
                  name="email"
                  placeholder="nombre@correo.com"
                  type="email"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Contraseña
                <input
                  className="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
                  name="password"
                  placeholder="Ingresa tu contraseña"
                  type="password"
                />
              </label>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4 text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  className="size-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                  type="checkbox"
                />
                Recordarme
              </label>
              <Link
                className="font-medium text-cyan-700 hover:text-cyan-800"
                to="/recuperar-contrasena"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button
              className="mt-8 w-full rounded-xl bg-cyan-600 px-5 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200"
              type="submit"
            >
              Ingresar como {role === "patient" ? "paciente" : "doctor"}
            </button>

            {role === "patient" ? (
              <p className="mt-6 text-center text-sm text-slate-600">
                ¿Aún no tienes una cuenta?{" "}
                <a
                  className="font-semibold text-cyan-700 hover:text-cyan-800"
                  href="/registro-paciente"
                >
                  Regístrate como paciente
                </a>
              </p>
            ) : (
              <p className="mt-6 text-center text-sm text-slate-600">
                ¿Eres profesional de la salud?{" "}
                <a
                  className="font-semibold text-cyan-700 hover:text-cyan-800"
                  href="/registro-doctor"
                >
                  Regístrate como doctor
                </a>
              </p>
            )}
          </form>
        </div>

        <p className="text-sm text-slate-500">
          © 2026 SaludConecta. Tu salud, más cerca.
        </p>
      </section>

      <aside className="relative hidden overflow-hidden bg-cyan-700 p-12 lg:flex lg:flex-col lg:justify-center">
        <div className="absolute -right-24 -top-20 size-96 rounded-full bg-cyan-500/35" />
        <div className="absolute -bottom-32 -left-24 size-96 rounded-full border-[40px] border-cyan-500/30" />
        <div className="relative max-w-lg text-white">
          <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
            Citas médicas sin complicaciones
          </span>
          <h2 className="mt-7 text-5xl font-semibold tracking-tight">
            Tu atención médica comienza aquí.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-cyan-50">
            Encuentra especialistas, elige el horario que te conviene y mantén
            tus citas organizadas.
          </p>
          <div className="mt-10 flex items-center gap-3 text-sm font-medium text-cyan-50">
            <span className="size-2 rounded-full bg-cyan-200" />
            Atención cercana y simple
          </div>
        </div>
      </aside>
    </main>
  );
}

export default LoginPage;
