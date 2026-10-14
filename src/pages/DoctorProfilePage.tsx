import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import AppShell from '../components/AppShell'
import { doctors, getReservedSlots, slots } from '../data/mockData'

const dayFormatter = new Intl.DateTimeFormat('es-PE', { weekday: 'short', day: 'numeric' })
const fullDateFormatter = new Intl.DateTimeFormat('es-PE', { weekday: 'long', day: 'numeric', month: 'long' })

function DoctorProfilePage() {
  const { id } = useParams()
  const doctor = doctors.find((item) => item.id === id) ?? doctors[0]
  const days = useMemo(() => Array.from({ length: 30 }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() + index)
    return date
  }), [])
  const [selectedDay, setSelectedDay] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const reservedSlots = getReservedSlots(selectedDay)
  const dayLabel = selectedDay === 0 ? 'Hoy' : selectedDay === 1 ? 'Mañana' : dayFormatter.format(days[selectedDay]).replace('.', '')

  return (
    <AppShell role="patient">
      <Link className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 hover:text-cyan-800" to="/paciente">
        <span aria-hidden="true">←</span> Volver a especialistas
      </Link>

      <section className="mt-5 grid items-start gap-6 lg:grid-cols-[minmax(18rem,0.82fr)_minmax(0,1.5fr)]">
        <article className="min-w-0 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="flex items-start gap-5">
            <div className={`grid size-20 shrink-0 place-items-center rounded-full text-2xl font-bold ${doctor.color}`}>
              {doctor.name.split(' ').at(-1)?.[0]}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-cyan-700">{doctor.specialty}</p>
              <h1 className="mt-1 text-3xl font-semibold leading-tight text-slate-900">{doctor.name}</h1>
              <p className="mt-3 text-slate-500">★ {doctor.rating} · {doctor.experience}</p>
              <p className="mt-2 text-slate-500">⌖ Consultorio en {doctor.location}</p>
              <p className="mt-3 text-sm font-medium text-slate-700">Tarifa de consulta: S/ {doctor.fee}</p>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6">
            <h2 className="text-lg font-semibold text-slate-900">Sobre la especialista</h2>
            <p className="mt-3 leading-7 text-slate-600">Atención médica cercana y personalizada. Esta información es referencial y forma parte de la maqueta.</p>
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-slate-900">Modalidades de atención</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-cyan-50 px-3 py-1.5 text-sm text-cyan-800">Consulta presencial</span>
              <span className="rounded-full bg-cyan-50 px-3 py-1.5 text-sm text-cyan-800">Consulta virtual</span>
            </div>
          </div>
        </article>

        <aside className="min-w-0 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-x-5 gap-y-2">
            <div>
              <h2 className="font-semibold text-slate-900">Horarios disponibles</h2>
              <p className="mt-1 text-sm capitalize text-slate-500">{fullDateFormatter.format(days[selectedDay])}</p>
            </div>
            <span className="pt-0.5 text-xs text-slate-400">Disponibilidad actualizada hace un momento</span>
          </div>

          <div aria-label="Selecciona una fecha" className="-mx-1 mt-5 flex snap-x gap-2 overflow-x-auto px-1 pb-3">
            {days.map((day, index) => (
              <button
                aria-pressed={selectedDay === index}
                className={`shrink-0 snap-start rounded-xl border px-3 py-2 text-center text-xs font-semibold transition-colors ${selectedDay === index ? 'border-cyan-600 bg-cyan-600 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-cyan-300 hover:text-cyan-800'}`}
                key={day.toISOString()}
                onClick={() => { setSelectedDay(index); setSelectedSlot(null) }}
                type="button"
              >
                {index === 0 ? 'Hoy' : index === 1 ? 'Mañana' : dayFormatter.format(day).replace('.', '')}
              </button>
            ))}
          </div>

          <p className="mt-2 text-sm font-medium text-slate-700">Cupos para {dayLabel}</p>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {slots.map((slot) => {
              const reserved = reservedSlots.includes(slot)
              const selected = selectedSlot === slot
              return (
                <button
                  aria-label={reserved ? `${slot}, reservado` : slot}
                  className={`min-w-0 rounded-lg border px-3 py-2.5 text-center text-sm font-medium transition-colors ${reserved ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 line-through' : selected ? 'border-cyan-600 bg-cyan-600 text-white' : 'border-cyan-200 bg-cyan-50 text-cyan-800 hover:bg-cyan-100'}`}
                  disabled={reserved}
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  type="button"
                >
                  {slot}{reserved && <span className="ml-1 text-xs no-underline">· Reservado</span>}
                </button>
              )
            })}
          </div>

          <Link className="mt-6 block w-full rounded-xl bg-cyan-600 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-cyan-700" to={`/reserva/${doctor.id}`}>
            Reservar cita{selectedSlot ? ` · ${selectedSlot}` : ''}
          </Link>
        </aside>
      </section>
    </AppShell>
  )
}

export default DoctorProfilePage
