import moment  from 'moment';

export const selectedTime = (time) => {
    return moment(time, 'HH:mm').toDate();
};