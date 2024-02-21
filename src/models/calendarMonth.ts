export interface ICalendarMonth {
  id: string;
  notWorkingDays: string[];
  month: Date;
  workHourRange: string[];
}

/*2° REACT-QUERY Fazer uma requisição todas as vezes em que o usuário clica em
 uma data especifica.

 Fazer uma requisição em /availableHours enviando a data especifica
 
 Filtro: Faz um requisição em /bookings e da um find em todas as bookings do dia
 da data especificada.

 Baseado na workHourRange removeremos as horas ocupadas que vieram da requisição
 /bookings 

 */

/*
 1- Criar as rotas de CalendarMonth (Repository, Controller, Model)
 2- Endpoint /availableHours passando workHourRange: string[] e selectedDay: DateTime via body
 3- consultar os horario reservados no /bookings
 4- Criar uma lista de string com os horarios a partir do workHourRange.
 5- Fazer uma mescla dos horario do workHourRange com os horarios reservados
 6- Retornar essa lista de string. (availableHours)
 */
