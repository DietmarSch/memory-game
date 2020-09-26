function sortArrayByIndex (getArr,intInd) {   // Array und Index
    let modified=true;
    while (modified){
        modified=false;
        for(j=0;j<getArr.length-1;j++) {
            let arrClb=[]
            
            if (getArr[j][intInd] > getArr[(j+1)][intInd]) {
                arrClb=getArr[j];
                getArr[j]=getArr[j+1];
                getArr[j+1]=arrClb;
                modified=true;
            }
        }
    }
    
    return getArr;
 }