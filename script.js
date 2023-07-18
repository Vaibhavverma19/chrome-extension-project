let savebutton=document.getElementById("save-btn");
let savetab=document.getElementById("tab-btn")
let myLead=[];
let inputEl=document.getElementById("input-El")
const ulEl=document.getElementById("ul-el");
console.log(ulEl)
const dataFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))
console.log(dataFromLocalStorage)
if(dataFromLocalStorage)
{
    myLead=dataFromLocalStorage
    //renderleads()
    render(myLead)
}
savebutton.addEventListener("click",function(){
    let str=inputEl.value
    myLead.push(str)
    localStorage.setItem("myLeads",JSON.stringify(myLead));
    render(myLead)
    inputEl.value=""
})
savetab.addEventListener("click",function(){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        myLead.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLead));
        render(myLead)
    })
})
let deletebutton=document.getElementById("delete-btn");
deletebutton.addEventListener("dblclick",function(){
    localStorage.clear();
    myLead=[]
    render(myLead)

})
let checkbutton=document.getElementById("check-btn")
checkbutton.addEventListener("click",function(){
    changeIfCheked()
})
function changeIfCheked(){
    let checkboxes = document.querySelectorAll(".item-checkbox");
    console.log(checkboxes)
    // Add event listener to each checkbox
    checkboxes.forEach(function(checkbox) {
        
            if (checkbox.checked) {
                // Checkbox is checked, do something
                let listItem = checkbox.parentElement; // Get the parent <li> element
                // let link = listItem.querySelector('a');
                // link.style.color = 'red';
                let leadValue = listItem.querySelector('a').textContent;
                
                // Find the index of the value in the 'leads' array
                let index = -1; // Initialize index as -1 (not found)

                for (let i = 0; i < myLead.length; i++) {
                  
                    if (myLead[i].trim() === leadValue.trim()) {
                     index = i;
                    break; // Exit the loop if a match is found
                }
                }
                
                // Remove the element from the 'leads' array
                if (index !== -1) {
                    myLead.splice(index, 1);
                }
                render(myLead)
                localStorage.setItem("myLeads",JSON.stringify(myLead));
               
                //render(myLead)
          
            } 
        
    });
}
function render(leads){
let listItems=""
for(let i=0;i<leads.length;i++)
{
   listItems += 
    `<li> 
        <input type="checkbox" class="item-checkbox">
        <a target='_blank' href='${leads[i]}'> ${leads[i]} 
        </a>
    </li>`
}
ulEl.innerHTML=listItems
}