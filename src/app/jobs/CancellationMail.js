import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../util/Mail';

class CancellationMail{
    get key(){
        return 'CancellationMail';
    }

    async handle({ data }){
        console.log('A fila executou!');
        const { appointment } = data;
        Mail.sendMail({
            to: `${appointment.provider.name} <${appointment.provider.email}>`,
            subject: 'Agendamento cancelado',
            template: 'cancellation',
            context: {
                provider: appointment.provider.name,
                user: appointment.user.name,
                date: format(parseISO(appointment.date), "'dia' dd 'de' MMMM', às' H:mm'h'",{
                    locale: pt,
                }),
            },
        });
    }
}

export default new CancellationMail();
