function generatePDF(){
    const element = document.getElementById("sheet0");

    html2pdf()
    .from(element)
    .save();
}
    
