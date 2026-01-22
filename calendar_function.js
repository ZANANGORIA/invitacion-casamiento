// ===== BOTÓN AGENDAR CALENDARIO =====
function initCalendarBtn() {
    const btn = document.getElementById('calendarBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const icsLines = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Mayra Gabriel//Boda//ES',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',

            // ========== EVENTO 1: Recordatorio de confirmación (1 Sep 2026) ==========
            'BEGIN:VEVENT',
            'UID:recordatorio-confirmacion-mayra-gabriel@invitacion',
            'SUMMARY:Recordatorio: Casamiento Mayra & Gabriel',
            'DTSTART:20260901T100000',
            'DTEND:20260901T110000',
            'DESCRIPTION:Después de muchos años compartidos\\, decidimos dar este paso y celebrarlo con quienes queremos.\\n\\nSi todavía no confirmaste tu asistencia o te quedó pendiente la tarjeta\\, podés hacerlo desde la invitación.',
            'STATUS:CONFIRMED',
            'SEQUENCE:0',
            'END:VEVENT',

            // ========== EVENTO 2: Día del casamiento (10 Oct 2026) ==========
            'BEGIN:VEVENT',
            'UID:casamiento-mayra-gabriel@invitacion',
            'SUMMARY:Casamiento de Mayra & Gabriel',
            'DTSTART:20261010T100000',
            'DTEND:20261011T040000',
            'LOCATION:Iglesia: [NOMBRE DE LA IGLESIA] - Salón: [NOMBRE DEL SALÓN]',
            'DESCRIPTION:Hoy celebramos.\\nGracias por ser parte de este día tan importante para nosotros.\\nNos vemos para compartir una noche inolvidable.',
            'STATUS:CONFIRMED',
            'SEQUENCE:0',
            'END:VEVENT',

            'END:VCALENDAR'
        ];

        const icsContent = icsLines.join('\r\n');
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'casamiento_mayra_gabriel.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}
