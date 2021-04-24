let socket = null;
let socket_admin_id = null;
let emailUser = null;

document.querySelector("#start_chat").addEventListener("click", (event) => 
{
    socket = io();

    const chat_help = document.getElementById('chat_help');
    chat_help.style.display = 'none';
    
    const chat_in_support = document.getElementById('chat_in_support');
    chat_in_support.style.display = 'block';
    
    const email = document.getElementById("email").value;
    emailUser = email;

    const text = document.getElementById("txt_help").value;

    socket.on("connect", () => 
    {
        const params = { email, text };
        socket.emit("client_first_access", params, (call, err) => 
        {
            if(err) {console.err(err); }
            else    { console.log(call); }
        });
    });

    socket.on("client_list_all_messsages", (messages) => 
    {
        var template_client = document.getElementById("message-user-template").innerHTML;
        var template_admin = document.getElementById("admin-template").innerHTML;

        messages.forEach(message => 
        {
            if(message.admin_id === null)
            {
                const rendered = Mustache.render(template_client, {message:message.text, email});

                document.getElementById("messages").innerHTML += rendered;
            }
            else
            {
                const rendered = Mustache.render(template_admin, {message_admin:message.text});

                document.getElementById("messages").innerHTML += rendered;
            }
        });
    });

    socket.on("admin_send_to_client", (message) => 
    {
        socket_admin_id = message.socket_id;
    
        const template_admin = document.getElementById("admin-template").innerHTML;
    
        const rendered = Mustache.render(template_admin, {message_admin: message.text});
    
        document.getElementById("messages").innerHTML += rendered;
      });
});

document.querySelector("#send_message_button").addEventListener("click", (event) => 
{
    const text = document.getElementById("message_user");
    const params =
    {
        text:text.value, 
        socket_admin_id
    }
    socket.emit("client_send_to_admin", params);

    const template_client = document.getElementById("message-user-template").innerHTML;

    const rendered = Mustache.render(template_client, 
    {
      message: text.value,
      email: emailUser,
    });

    document.getElementById("messages").innerHTML += rendered;
    document.getElementById("message_user").value = "";
});

function fecharConexao()
{
    console.log("fecharConexao");
    if(socket!=null)
    {
        console.log(socket);
        const socket_id = socket.id;
        socket.emit("disconnect_user", {socket_id});
        socket.emit("admin_update_list_after_user_disconnect");

        const chat_in_support = document.getElementById("chat_in_support");
        chat_in_support.style.display = "none";
    }

    const chat = document.getElementById("chat_help");
    chat.style.display = "none";

    const email = document.getElementById("email");
    email.value = "";

    const text = document.getElementById("txt_help");
    text.value = "";

}