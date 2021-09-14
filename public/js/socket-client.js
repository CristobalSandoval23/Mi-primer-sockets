const lblonline = document.querySelector('#lblOnline');
const lblOffine = document.querySelector('#lblOffine');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

const socket = io();

socket.on('connect', ()=>{
    console.log('conectado')

    lblOffine.style.display = 'none';
    lblonline.style.display = '';
})
socket.on('disconnect', ()=>{
    console.log('Desconectado')
    lblonline.style.display = 'none';
    lblOffine.style.display = '';
})


socket.on('enviar-mensaje', (payload)=>{
    console.log(payload)
})


btnEnviar.addEventListener('click', ()=>{
    const mensaje = txtMensaje.value;

    payload = {
        mensaje,
        id: '1232',
        fecha: new Date().getTime()
    }

    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('id', id)
    })

})