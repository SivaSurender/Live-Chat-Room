// things to do 
// adding new chat documents
// setting up real time listeners to get new chats
// updating the user name
// updating the room

class Chatroom {
    constructor(room,username){
        this.room = room;
        this.username = username;
        this.chats = database.collection("chats");
        this.unsub;
    }

    //we are passing in message to the add chat function since message needs to added/updated in realtime
    async addChat(message){
        //format chat object

        const current_time = new Date();
        const chat ={
        message: message,
        username: this.username,
        room : this.room,
        created_at : firebase.firestore.Timestamp.fromDate(current_time)
        };

        const response = await this.chats.add(chat);
        return response;
        
    }

    // adding active listener 
    // this will not be an async function since it will be called multiple times

    // getchats function has an active listener which checks for any doc changes and calls the callback function if the "if condition is satisfied" 
    getChats(callback){
        this.unsub = this.chats
        //filtering the chat changesbased on the type of romm timestamp it was modified recently
        .where("room", "==", this.room)
        .orderBy("created_at")
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type === "added"){
                    callback(change.doc.data());
                }
            });
        });
    }
    updateName(username){
        this.username = username;
    }
    updateRoom(room){
        this.room = room;
        console.log("room updated")
        if (this.unsub){
            this.unsub();
        }
    }
};



// setTimeout(() => {
//     chatroom.updateRoom("gaming");
//     chatroom.updateName("Yurekha");
//     chatroom.getChats((data) =>{
//         console.log(data);
//     });
//     chatroom.addChat("hello");
// }, 3000);