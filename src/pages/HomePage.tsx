import { Link } from "react-router";
import AppShell from "../components/AppShell";
import { getAvailableSpecialties } from "../data/mockData";

function HomePage() {
  const specialties = getAvailableSpecialties();
  return (
    <AppShell role="patient">
      <section className="grid items-center gap-10 rounded-3xl bg-cyan-700 px-7 py-12 text-white lg:grid-cols-[1.15fr_0.85fr] lg:px-12 lg:py-16">
        <div>
          <p className="text-sm font-semibold tracking-widest text-cyan-100">
            ATENCIÓN MÉDICA MÁS CERCA
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Cuidar de tu salud nunca fue tan sencillo.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-cyan-50">
            Encuentra especialistas, revisa sus horarios y reserva tu próxima
            cita desde un solo lugar.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              className="rounded-xl bg-white px-5 py-3 font-semibold text-cyan-800 hover:bg-cyan-50"
              to="/login?next=/paciente"
            >
              Reservar una cita
            </Link>
            <Link
              className="rounded-xl border border-cyan-300/60 px-5 py-3 font-semibold text-white hover:bg-cyan-600"
              to="/paciente"
            >
              Ver especialistas
            </Link>
          </div>
        </div>
        <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm">
          <div className="rounded-2xl bg-white p-5 text-slate-900 shadow-xl">
            <p className="text-sm font-semibold text-cyan-700">
              PRÓXIMA DISPONIBILIDAD
            </p>
            <h2 className="mt-2 text-xl font-semibold">
              Agenda tu consulta en minutos
            </h2>
            <div className="mt-5 space-y-3">
              {[
                "Elige una especialidad",
                "Encuentra a tu doctor",
                "Reserva el horario ideal",
              ].map((step, index) => (
                <div className="flex items-center gap-3" key={step}>
                  <span className="grid size-7 place-items-center rounded-full bg-cyan-100 text-sm font-bold text-cyan-700">
                    {index + 1}
                  </span>
                  <span className="text-sm text-slate-600">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mt-14">
        <p className="text-center text-sm font-semibold text-cyan-700">
          ENCUENTRA LO QUE NECESITAS
        </p>
        <h2 className="mt-2 text-center text-3xl font-semibold text-slate-900">
          Especialidades disponibles
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {specialties.map((specialty, index) => (
            <Link
              className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-cyan-300"
              key={specialty.name}
              to="/paciente"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-cyan-50 text-xl text-cyan-700">
                {["⌁", "♥", "✦", "☀"][index]}
              </span>
              <h3 className="mt-4 font-semibold text-slate-900">{specialty.name}</h3>
              <p className="mt-1 text-sm text-slate-500">Ver especialistas</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="mt-14 rounded-3xl bg-slate-100 px-7 py-10 text-center">
        <h2 className="text-2xl font-semibold text-slate-900">
          ¿Eres profesional de la salud?
        </h2>
        <p className="mt-3 text-slate-600">
          Gestiona tu perfil, disponibilidad y agenda desde SaludConecta.
        </p>
        <Link
          className="mt-6 inline-block font-semibold text-cyan-700 hover:text-cyan-800"
          to="/login"
        >
          Ingresar como doctor →
        </Link>
        <Link
          className="mt-4 block text-sm font-medium text-slate-500 hover:text-cyan-700"
          to="/admin"
        >
          Acceso a administración
        </Link>
      </section>
    </AppShell>
  );
}

export default HomePage;
