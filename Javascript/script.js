// this portion will update the financial 
let finInfo=(JSON.parse(localStorage.getItem('finInfo')));


document.getElementById("financebtn").addEventListener("click", ComapanyFinance);
function ComapanyFinance() 
{
    const cashAdd =parseFloat( document.getElementById("cashAdd").value);
    const loan =parseFloat( document.getElementById("loan").value);
    const expen =parseFloat( document.getElementById("expen").value);
    console.log(cashAdd,loan,expen);


    let companyFund=finInfo.cf;
    let companyExpense=finInfo.ce;
    let companyloan=finInfo.cl;
    
    finInfo.cf=Number(companyFund)+cashAdd;
    finInfo.ce=Number(companyExpense)+expen;
    finInfo.cl=Number(companyloan)-loan;
    localStorage.setItem('finInfo',JSON.stringify(finInfo))
    alert('Finance Info Updated');
    location.replace('../index.html')
  
       
}

// this portion is to calculate salary
let emps=[]; 
emps=JSON.parse(localStorage.getItem('emps'))

function salaryFunction(){
    let getId=document.getElementById("emId").value;
    let getLeave=document.getElementById("leave").value;
    let bonus=document.getElementById("bonus").value;
    let loanPay=document.getElementById("emLoan").value;

    
    for(let i=0;i<emps.length;i++)
    {
        if(getId==emps[i].ID)
        {
           console.log(emps[i]);
            let LeaveAmount=parseInt(getLeave)*300;
           let salary = parseInt(emps[i].Salary);
          let loan=parseInt(emps[i].Loan);

             salary=(salary+parseFloat(bonus))-parseFloat(loanPay)-LeaveAmount;
            loan=loan- parseFloat(loanPay);

            emps[i].Payable_Salary=salary;
            emps[i].Loan=loan;
        }
        
    }
    
    localStorage.setItem('emps',JSON.stringify(emps));
   alert(`Salary Updated of Employee ${emps[parseInt(getId)-1].Employe_Name}`);
   location.replace('../employee.html');

}



function createEmployee()
{
    let name=document.getElementById("name").value;
    let post=document.getElementById("post").value;
    let salary=document.getElementById("salary").value;
    let gender=document.getElementById("gender").value;
    let img1='https://cdn.iconscout.com/icon/premium/png-512-thumb/male-employee-6017556-4971282.png?f=webp&w=256'
    let img2='https://cdn.iconscout.com/icon/premium/png-512-thumb/female-employee-2951458-2445223.png?f=webp&w=256'

    let employee;

    if(gender=='Male')
    {
       employee={
        img: img1,
        ID: String(Number(emps[emps.length-1].ID)+1),
        Employe_Name:name,
        Employe_post:post,
        Gender:"Male",
        Salary:Number(salary),
        Loan:0,
        Payable_Salary:0,
        Salary_month:0}
    }
    else{
        employee={
            img: img2,
            ID: String(Number(emps[emps.length-1].ID)+1),
            Employe_Name:name,
            Employe_post:post,
            Gender:"Female",
            Salary:Number(salary),
            Loan:0,
            Payable_Salary:0,
            Salary_month:0}
    }
    emps.push(employee);
    localStorage.setItem('emps',JSON.stringify(emps));
    alert('New Employee Added');
    location.replace('../employee.html');

}


function calculateLoan()
{
    const id=document.getElementById('id').value;
    const loan= document.getElementById('emploan').value;
    for(let i=0;i<emps.length;i++)
    {
        if(id==emps[i].ID)
        {
          emps[i].Loan=Number(emps[i].Loan)+Number(loan);
        }
        
    }
    localStorage.setItem('emps',JSON.stringify(emps));
   alert(`Loan Updated of Employee ${id}`);
   location.replace('../employee.html');
    
}



