
fetch("../Jsons/employe.json")
    .then((res) => {
        return res.json()
    })
    .then((data) => {

        if (localStorage.getItem('emps') == null) {
            localStorage.setItem('emps', JSON.stringify(data));
        }
        showData();
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });



let emps = []
function showData() {

    if (localStorage.getItem('emps') != null) {
        emps = JSON.parse(localStorage.getItem('emps'));
    }


    let result = '';
    for (let i = 0; i < emps.length; i++) {

        result += `<div class="col-3 mx-auto mb-5" id=${emps[i].ID}>
        <div class="card   border p-3 shadow mx-auto" style="width: 18rem; padding: 0; border-radius: 20px; background-color:rgb(228, 237, 245)">
            <div class="d-flex">
             <img class="rounded-circle float-left m-2 p-1 border border-1 border-secondary " style="width: 100px; height: 100px;" src=${emps[i].img} alt="">
              <div class="my-2 ">
                 <h6><b>ID: ${emps[i].ID}</b></h6>
                <h6 style="font-size: small;">${emps[i].Employe_Name}</h6>
                <h6 style="font-size: smaller;" class="text-muted">${emps[i].Employe_post}</h6>
            
              </div>
            </div>
             <div class="card-body">
                 <h5 class="card-title">Salary: <span class="salary">${emps[i].Salary}</span> </h5>
                 <h5 class="card-title">Loan: <span class="loan">${emps[i].Loan}</span> </h5>
                 
                <h5 class="card-title">Payable Salary: <span class="payableSalary">${emps[i].Payable_Salary}</span></h5>
                <h5 class="card-title">Salary Month: <span class="salaryMonth">${emps[i].Salary_month}</span></h5>
                <div class="text-center m-1 pt-2">
                 <a href="#" class="btn btn-outline-primary" onclick=paySalary(${emps[i].ID})>Pay Salary</a>
                 <a href="#" class="btn btn-outline-danger" onclick=deleteEmployee(${emps[i].ID})>Delete</a>
                </div>
             </div>
         </div>
     </div>`;
    }

    let element = document.getElementById('emps');
    let countElement = document.getElementById('count');
    countElement.innerHTML = emps.length;
    element.innerHTML = result;
}
showData();


function searchData() {
    let srchId = document.getElementById('srchId').value;
    let searchResult = document.getElementById('searchRes');
    let res = ''; let flag = 0;

    let notfound = `<div class="card bg-light bg-gradient border rounded-3 mx-auto" style="width: 25rem; padding: 0; margin-top: 10px; ">
   <div class="d-flex">
    
     <div class="my-2 ">
       <h6 class="ms-3" style="font-size:large ;">No employee found</h6>
     </div>
   </div>
    
</div>`




    for (let i = 0; i < emps.length; i++) {

        if (srchId == emps[i].ID) {
            flag = 1;
            res += `<div class="card bg-light bg-gradient border rounded-3 mx-auto" style="width: 25rem; padding: 0; margin-top: 10px; ">
                <div class="d-flex">
                 <img class="rounded-circle float-left m-2 p-1 border border-1 border-secondary " style="width: 80px; height: 80px;" src=" ${emps[i].img}" alt="">
                  <div class="my-2 ">
                     <h6><b>ID: ${emps[i].ID}</b></h6>
                    <h6 style="font-size: small;"> ${emps[i].Employe_Name}</h6>
                    <h6 style="font-size: smaller;" class="text-muted"> ${emps[i].Employe_post}</h6>
                
                  </div>
                </div>
                 
             </div>`
        }
    }
    if (flag == 0) {
        searchResult.innerHTML = notfound;
    }
    else {
        searchResult.innerHTML = res;
    }


}


function paySalary(id) {

    let finInfo = JSON.parse(localStorage.getItem('finInfo'))
    for (let i = 0; i < emps.length; i++) {
        if (emps[i].ID == id) {

            let salary = parseInt(emps[i].Payable_Salary);
            finInfo.cf = parseInt(finInfo.cf) - salary;
            finInfo.ce = parseInt(finInfo.ce) + salary;
            emps[i].Salary_month = parseInt(emps[i].Salary_month) + 1;
            emps[i].Payable_Salary = 0; break;

        }

    }
    localStorage.setItem('finInfo', JSON.stringify(finInfo));
    localStorage.setItem('emps', JSON.stringify(emps));
    alert('Salary Paid')
    showData();


}

function deleteEmployee(id) {
    let flag = confirm('Do You want to Delete this?')
    if (flag == true) {

        for (let i = 0; i < emps.length; i++) {
            if (emps[i].ID == id) {

                emps.splice(i, 1);
                localStorage.setItem('emps', JSON.stringify(emps));
                alert('Employee Deleted');
                showData();

            }

        }


    }

}

