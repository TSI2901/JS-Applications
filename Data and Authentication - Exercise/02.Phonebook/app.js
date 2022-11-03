function attachEvents() {
    
    const phoneBook = document.getElementById('phonebook');
    document.getElementById("btnLoad").addEventListener('click',onLoad);
    document.getElementById("btnCreate").addEventListener('click',onCreate);
    const url = "http://localhost:3030/jsonstore/phonebook";
    async function onLoad() {
        phoneBook.innerHTML = '';
        const responce = await fetch(url);
        const data = await responce.json();
        
        for (const entry of Object.values(data)) {
            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener('click', onDelete);

            let li = document.createElement('li');
            li.id = entry._id;
            li.textContent = `${entry.person}: ${entry.phone}`;
            li.appendChild(deleteBtn);

            phoneBook.appendChild(li);
        }
    }
    async function onCreate(){
        let person = document.getElementById('person').value;
       let phone = document.getElementById('phone').value;

        await fetch(url,{
            method:"Post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({person,phone})
        })
        person.value = '';
        phone.value = '';
        onLoad();
    }
    async function onDelete(e){
        let id = e.target.parentNode.id;
        
        await fetch(`${url}/${id}`,{
            method:"Delete"
        })
        document.getElementById(id).remove();
    }
}

attachEvents();