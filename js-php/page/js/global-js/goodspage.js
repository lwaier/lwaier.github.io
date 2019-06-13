function pageChajian (idSrt,jsonArr){
    this.target = document.getElementById(idSrt)
    this.target.innerHTML=""
    this.target.className='page'
    this.pageIndex=1
    this.data={
        dataAll:100,    //一共的数据
        dataEveryPage:5,  //每一页显示多少数据
        showPage:5   //显示的页码长度
    }
    for(let i in jsonArr){
        this.data[i]=jsonArr[i]
    }
    this.allPage = Math.ceil(this.data.dataAll/this.data.dataEveryPage)
    this.create()
    this.createData()
}

pageChajian.prototype.createData=function(){
    
    let start = 1
    let end = this.allPage>this.data.showPage?this.data.showPage:this.allPage
    let middle = Math.floor(this.data.showPage/2)
    
    if(this.pageIndex>middle){
        start = this.pageIndex-middle
        end = this.pageIndex+middle
    }

    if(this.pageIndex>this.allPage-middle){
        start=this.allPage-this.data.showPage+1
        end=this.allPage
    }
    start=start<1?1:start
    this.ul.innerHTML=""
    let that = this
    for(let i = start ;i<=end;i++){
        
        let li = document.createElement('li')
        if(i==this.pageIndex){
            li.className='selectd'
        }
        li.innerHTML=i;
        li.index=i;
        this.ul.appendChild(li)
        li.onclick=function(){
            that.pageIndex=this.index
            that.createData()
        }
    }
    this.span.className=""
    this.spanTwo.className=""
    if(this.pageIndex==1){
        this.span.className="selectd"
    }
    if(this.pageIndex==this.allPage){
        this.spanTwo.className="selectd"
    }

    this.span.onclick=function(){
        that.pageIndex--;
        if(that.pageIndex<1){
            that.pageIndex=1
        }
        that.createData()
    }
    this.spanTwo.onclick=function(){
        that.pageIndex++;
        if(that.pageIndex>that.allPage){
            that.pageIndex=that.allPage
        }
        that.createData()
    }

    this.data.callback(this.pageIndex)
}

pageChajian.prototype.create=function(){
    this.span = document.createElement('span')
    this.span.innerHTML='上一页'
    this.span.setAttribute('id','prevPage')
    this.target.appendChild(this.span)

    this.ul = document.createElement('ul')
    this.ul.setAttribute('id','contentPage')
    this.target.appendChild(this.ul)

    this.spanTwo = document.createElement('span')
    this.spanTwo.innerHTML='下一页'
    this.spanTwo.setAttribute('id','nextPage')
    this.target.appendChild(this.spanTwo)
}

export{
    pageChajian
}