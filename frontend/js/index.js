async function logDonorData() {
    const res=await fetch("http://localhost:3001/getdoners")
    if(res.status=200){
        const donors=await res.json();
        console.log(donors);
        let str1=""
        donors.forEach((donor,index)=> {
            str1+=`<tr id="tr">
                    <td><input type="text" value="${donor.name}" name="name" id="name-${donor._id}" disabled=true></td>
                    <td><input type="text" value="${donor.phone}" name="phone" id="phone-${donor._id}" disabled=true></td>
                    <td><input type="text" value="${donor.address}" name="addres" id="addres-${donor._id}" disabled=true></td>
                    <td><input type="text" value="${donor.gender}" name="gender" id="gender-${donor._id}" disabled=true></td>
                    <td><input type="text" value="${donor.blood}" name="blood" id="blood-${donor._id}" disabled=true></td>
                    <td><button  class="edit" onclick="handelEdit('${donor._id}')">edit</button></td>
                    <td><button class="save" onclick="save('${donor._id}')">save</button></td>
                    <td><button class="del" onclick="handelDelete('${donor._id}')">delete</button></td>
                </tr>`
        });
        document.getElementById("display").innerHTML=str1
    }
}
logDonorData()
function handelEdit(id){
    document.getElementById(`name-${id}`).disabled=false
    document.getElementById(`phone-${id}`).disabled=false
    document.getElementById(`addres-${id}`).disabled=false
    document.getElementById(`gender-${id}`).disabled=false
    document.getElementById(`blood-${id}`).disabled=false
    document.getElementById(`name-${id}`).style.backgroundColor = "white";
    document.getElementById(`phone-${id}`).style.backgroundColor = "white";
    document.getElementById(`addres-${id}`).style.backgroundColor = "white";
    document.getElementById(`gender-${id}`).style.backgroundColor = "white";
    document.getElementById(`blood-${id}`).style.backgroundColor = "white";
}
function save(id){
3
}
async function handelDelete(id) {
    const res=await fetch("http://localhost:3001/delete",{
        method:"DELETE",
        headers:{"Content-Type":"text/plain"},
        body:id
    })
    console.log(res);
    if (res.status==200) {
        alert("succesfully deleted")
        logDonorData()
    }
    else{
        alert("failed")
    }

}