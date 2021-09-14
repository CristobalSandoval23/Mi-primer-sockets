
const lblEscritorio  = document.querySelector('h1');
const lblTicket  = document.querySelector('small');
const divAlerta  = document.querySelector('.alert');
const btnAtender  = document.querySelector('button');
const lblPendientes  = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';

    throw new Error('El escriotrio es obligatorio')
}

const escritorio = searchParams.get('escritorio')
lblEscritorio.innerText = escritorio;

divAlerta.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    socket.on('ultimo-ticket', (ultimo)=>{
        // lblEscritorio.innerText = 'Ticket '+ ultimo;
    })
    socket.on('tickets-pendientes', (pendientes)=>{
        if(pendientes === 0){
            lblPendientes.style.display = 'none';
        }else {
            lblPendientes.style.display = '';
            lblPendientes.innerText = pendientes;
        }
        // lblEscritorio.innerText = 'Ticket '+ ultimo;
    })
    btnAtender.disabled = false;
    
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    
    
    btnAtender.disabled = true;
});


btnAtender.addEventListener( 'click', () => {
    
    socket.emit('atender-ticket', {escritorio}, ({ok, ticket, msg}) => {
        if(!ok){
            lblTicket.innerText = ' nadie.';
            return divAlerta.style.display = '';
        }

        lblTicket.innerText = 'Ticket ' +ticket.numero;

    });

});