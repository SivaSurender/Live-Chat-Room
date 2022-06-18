
// render the obtained chat templatesto the DOM
// to clear the list of chats when the room changes

class ChatUI {
    constructor(list){
        this.list = list;
    }


    // to clear data when theuser switches to another room 
    clear(){
        this.list.innerHTML = "";
    }

    // render function to update chat i.e which has single object

    render(data){

        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            { addSuffix:true }
          );
        const html =`
            <li class = "list-group-item">
            <span class = "username">${data.username}</span>
            <span class = "message">${data.message}</span>
            <div class = "time">${data.created_at.toDate()}</div>
            </li>
        `;

        this.list.innerHTML += html;
    }
}