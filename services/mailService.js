"use strict";


const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = app => {

    function sendRegistrationMail(mail, name){
      console.log("sendRegistrationMail");
      console.log(mail);
        const msg = {
          to: mail,
          from: 'info@leescubrelo.com',
          subject: '¡Gracias por participar en Leescúbrelo!',
          text: 'Hola, ¡Gracias por participar en Leescúbrelo!. Próximamente se anunciáran a los ganadores. “El que lee mucho y anda mucho, ve mucho y sabe mucho”, Miguel de Cervantes',
          html: 'Hola,<br />Gracias por participar en Leescúbrelo<br /> <h1>Próximamente se anunciáran a los ganadores</h1><br /> “El que lee mucho y anda mucho, ve mucho y sabe mucho”<br /> Miguel de Cervantes',
        };

        sgMail.send(msg);
    }


    function sendRejectedMail(mail, name){
        console.log("sendRejectedMail");
        console.log(mail);
        const msg = {
          to: mail,
          from: 'info@leescubrelo.com',
          subject: 'Tu ensayo fue descalificado',
          text: 'Hola, ¡Gracias por participar en Leescúbrelo!. Próximamente se anunciáran a los ganadores. “Que otros se jacten de las páginas que han escrito; a mi me enorgullecen las que he leído”, Jorge Luis Borges',
          html: '<p>Hola, <br />Gracias por participar en Leescúbrelo,<br /> Próximamente se anunciáran a los ganadores</p><br /> “Que otros se jacten de las páginas que han escrito; a mi me enorgullecen las que he leído”<br /> Jorge Luis Borges',
        };

        sgMail.send(msg);

    }


    function sendFinalistMail(mail, name){
        console.log("sendFinalistMail");
        console.log(mail);
        const msg = {
          to: mail,
          from: 'info@leescubrelo.com',
          subject: '¡Felicidades eres uno de los finalistas de Leescúbrelo!',
          text: 'Hola, ¡Felicidades eres uno de los finalistas de Leescúbrelo!. Aproximante en nuestras redes sociales el lugar en donde se llevara acabo la premiacíon. “Cuanto más lees, más cosas sabrás. Cuantas más cosas aprendes, a más lugares visitarás”, Dr Seuss',
          html: 'Hola, <br /> <h1>¡Felicidades eres uno de los finalistas de Leescúbrelo!</h1>,<br /> Aproximante en nuestras redes sociales el lugar en donde se llevara acabo la premiacíon<br /> “Cuanto más lees, más cosas sabrás. Cuantas más cosas aprendes, a más lugares visitarás”<br /> Dr Seuss',
        };

        sgMail.send(msg);
    }

    return {
        sendRegistrationMail,
        sendRejectedMail,
        sendFinalistMail
    }
    
}



