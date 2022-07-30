function calcularCuotas(){

    var monto = parseFloat(document.getElementById("input-monto").value);
    var cuotas = parseFloat(document.getElementById("input-ctdad-cuotas").value);
    var tasa = parseFloat(document.getElementById("tasa-tc").value);
    var amortizacion_mensual = Math.round((monto/cuotas+Number.EPSILON)*100)/100;

    var serie_pagos=[];

    saldo=monto;
    var intereses_totales=0

    for(var i=0; i<cuotas;i++){

        intereses=Math.round((saldo*tasa/100 + Number.EPSILON)*100)/100;
        valor_cuota=Math.round((amortizacion_mensual+intereses + Number.EPSILON)*100)/100;
        saldo=Math.round((saldo-amortizacion_mensual+Number.EPSILON)*100)/100;
        
        if (i == cuotas-1){
            valor_cuota=Math.round((valor_cuota+saldo+ Number.EPSILON)*100)/100;
            saldo=0
        }
    
        conjunto_datos={"valor_cuota":valor_cuota,"intereses":intereses,"saldo":saldo}
        serie_pagos.push(conjunto_datos);
        intereses_totales+=intereses;
        intereses_totales=Math.round((intereses_totales+Number.EPSILON)*100)/100;

    }

    costo_total=monto+intereses_totales;


    res1.textContent=`Los interes que pagas por esta compra serán de: $${intereses_totales}`;
    res2.textContent=`Costo total de la compra:  $${costo_total}`;


    var remove_table=document.getElementById("div_tabla");
    remove_table.remove();

    
    llenar_tabla(serie_pagos);

}

function llenar_tabla(pagos){
    
    let table_div=document.createElement('div');
    table_div.setAttribute("id","div_tabla");
    let table = document.createElement('table');
    table.setAttribute("class","c-tabla");
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    table_div.appendChild(table);
    table.appendChild(thead);
    table.appendChild(tbody);

// Adding the entire table to the body tag
    document.getElementById('pagos-tabla').appendChild(table_div);

    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "Cuota No.";
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "Valor Cuota";
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = "Intereses a Pagar";
    let heading_4 = document.createElement('th');
    heading_4.innerHTML = "Saldo";

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    thead.appendChild(row_1);


    for(var i=0 ; i<pagos.length ; i++){
        let row = document.createElement('tr');
        let col_cuota = document.createElement('td');
        col_cuota.innerHTML = i+1;
        let col_valor= document.createElement('td');
        col_valor.innerHTML = pagos[i].valor_cuota;
        let col_intereses = document.createElement('td');
        col_intereses.innerHTML = pagos[i].intereses;
        let col_saldo = document.createElement('td');
        col_saldo.innerHTML = pagos[i].saldo;

        row.appendChild(col_cuota);
        row.appendChild(col_valor);
        row.appendChild(col_intereses);
        row.appendChild(col_saldo);
        tbody.appendChild(row);
    }
    

}

calcularCuotas()





recalcular = document.getElementById("btn-calcular")

recalcular.addEventListener("click", calcularCuotas);