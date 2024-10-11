fetch("../Jsons/employe.json")
.then((res)=>{
   return  res.json()
})
.then((data)=>{
   
    if(localStorage.getItem('emps')==null)
    {
        localStorage.setItem('emps',JSON.stringify(data));
    }
   
   
})
.catch(error => {
    console.error('Error fetching data:', error);
  });







fetch('../Jsons/financeInfo.json')
.then((res)=>{
    return res.json();
})
.then((data)=>{
    if(localStorage.getItem('finInfo')==null)
    {
        localStorage.setItem('finInfo',JSON.stringify(data));
    }
    showData();
})

// This portion is to calculate salary
let salary=0;
let emps=[];
function calculateSalary()
{
   
if(localStorage.getItem('emps')!=null)
{
    emps=JSON.parse(localStorage.getItem('emps'));
}

for(let i=0;i<emps.length;i++)
{
    salary+=Number(emps[i].Salary);
}
}


// to the data from localstorage

function showData()
{
    calculateSalary();
    let finInfo=(JSON.parse(localStorage.getItem('finInfo')));
const finElement= document.getElementById('finInfo');

let res= `<div class="  mx-auto mt-4 col-3  cardInfo1 shadow" style="background:linear-gradient(to right,rgb(158, 208, 209),rgb(209,239,240)
); ">
<div>
<p class="fw-bold">Company Fund</p>
<h3 id="cf">${finInfo.cf}</h3>
</div>
</div>
<div class="mx-auto mt-4 col-3  cardInfo1 shadow" style="background:linear-gradient(to right,rgb(222,143,235),rgb(158,118,171)
)">
<div>
<p class="fw-bold">Salary Of Employee</p>
<h3 id="se">${salary}</h3>
</div>
</div>
<div class="mx-auto mt-4 col-3  cardInfo1 shadow"
style="background:linear-gradient(to right,rgb(232, 216, 152),rgb(252, 245, 214))">
<div>
<p class="fw-bold">Company Expenditure</p>
<h3 id="ce">${finInfo.ce}</h3>
</div>
</div>
<div class=" mx-auto mt-4 col-3  cardInfo1 shadow"
style="background:linear-gradient(to right,rgb(232,169,169),rgb(196,135,135))">
<div>
<p class="fw-bold">Company Loan</p>
<h3 id="cl">${finInfo.cl}</h3>
</div>
</div>`


finElement.innerHTML=res;

}
