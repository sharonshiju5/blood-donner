const doners = JSON.parse(localStorage.getItem("obj"));
console.log(doners.name);
console.log(doners);

str=``
// for(i=0;i<=doners.length;i++){

str+=`
            <td>${doners.name}</td>
            <td>${doners.phone}</td>
            <td>${doners.address}</td>
            <td>jbsjl</td>
            <td>jbsjl</td>
            <td><button class="edit">edit</button></td>
            <td><button class="save">save</button></td>
            <td><button class="del">delete</button></td>`
// }
document.getElementById("tr").innerHTML=str