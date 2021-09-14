
// Referencias del HTML
const lblNuevoTicket  = document.querySelector('#lblNuevoTicket');
const btnCrear  = document.querySelector('button');


const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');
    socket.on('ultimo-ticket', (ultimo)=>{
        lblNuevoTicket.innerText = 'Ticket '+ ultimo;
    })
    btnCrear.disabled = false;
    
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    
    
    btnCrear.disabled = true;
});


// socket.on('siguiente-ticket', (payload) => {
//     console.log( payload )
// })


btnCrear.addEventListener( 'click', () => {

    // const mensaje = txtMensaje.value;
    // const payload = {
    //     mensaje,
    //     id: '123ABC',
    //     fecha: new Date().getTime()
    // }
    
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        // console.log('Desde el server', ticket );
        lblNuevoTicket.innerText = ticket;
    });

});