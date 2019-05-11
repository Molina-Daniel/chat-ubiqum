
document.getElementById("login").addEventListener("click", login);

document.getElementById("send").addEventListener("click", sendMessage);

getMessages();

function login() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider);
}

function sendMessage() {
  let name = firebase.auth().currentUser.displayName;
  let text = document.getElementById("text").value;

  let messageToSend = {
    nombre: name,
    mensaje: text
  }

  firebase.database().ref("messages").push(messageToSend);
  // console.log(messageToSend);
}

function getMessages() {
  firebase.database().ref("messages").on("value", (data) => {
    document.getElementById("messages").innerHTML = "";
    // console.log(data.val());
    for (const key in data.val()) {
      let element = data.val()[key];

      let p = document.createElement("p");
      p.append(element.mensaje)
      document.getElementById("messages").append(element.mensaje)
    }
  })

  // console.log("get");

}