document.getElementById("ph").addEventListener('keyup',(e)=>{
    res=phone(e.target.value)
    document.getElementById("phno").textContent=res?"*valid phone number":"invalid phone number"
    document.getElementById("phno").style.color=res?"green":"red"
})
function phone(data){
    const pattern=/^[6-9]\d{9}$/
    return pattern.test(data);
}
document.getElementById("usr").addEventListener('keyup',(e)=>{
    res=username(e.target.value)
    document.getElementById("usr-sp").textContent=res?"*valid username":"*invalid username"
    document.getElementById("usr-sp").style.color=res?"green":"red"
})
function username(data){
    const pattern=/^[a-z].{5}/
    return pattern.test(data);
}