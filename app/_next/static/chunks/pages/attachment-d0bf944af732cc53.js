(global.webpackChunk_N_E=global.webpackChunk_N_E||[]).push([[785],{1556:(e,t,n)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/attachment",function(){return n(4493)}])},8468:(e,t,n)=>{"use strict";n.d(t,{Z:()=>s});var r=n(4246),a=n(4426);n(4893);function s(e){var t=e.children;return(0,r.jsx)(a.Z,{className:"h-screen",style:{backgroundColor:"transparent"},children:(0,r.jsx)(a.Z,{className:"h-full px-8 py-4",children:t})})}},9802:(e,t,n)=>{"use strict";n.d(t,{Z:()=>c});var r=n(4246),a=n(1875),s=n(489),l=n(9554);const c=function(e){var t=e.message,n=void 0===t?l.c:t;return(0,r.jsx)(a.Z,{direction:"vertical",style:{width:"100%"},className:"my-2",children:(0,r.jsx)(s.Z,{message:n,type:"error"})})}},4493:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>B});var r=n(3842),a=n(9722),s=n(169),l=n(2050),c=n(9312),u=n(4246),i=n(7378),o=n(4426),d=n(5226),y=n(1058),m=n(477),h=n(4813),p=n(5062),f=n(374),Z=n(3361),g=n(2846),v=n(1875),x=n(489),S=n(637),b=n(5427),j=n(2062),w=n(881),_=n(6591),P=n(8468),C=n(2166),N=n(2256),F=n(6677);var I,T,k=n(9802),A=o.Z.Content,D={labelCol:{span:6},wrapperCol:{span:14}},E=["CASH","BANK","CHECK"];const B=function(){var e=(0,F.useRouter)(),t=(0,i.useState)([]),n=t[0],B=t[1],R=(0,i.useState)([]),W=(R[0],R[1],(0,i.useState)(null)),q=W[0],K=W[1],O=(0,i.useState)(!1),V=O[0],z=(O[1],(0,i.useState)(!1)),H=z[0],L=z[1],M=(0,i.useState)(!1),G=M[0],J=(M[1],(0,i.useState)([])),X=J[0],Y=J[1],$=(0,i.useState)(null),Q=$[0],U=$[1],ee=(0,l.Z)(d.Z.useForm(),1)[0],te=(0,i.useState)(""),ne=te[0],re=te[1],ae=(0,i.useState)("BANK"),se=ae[0],le=ae[1],ce=(0,i.useState)(!1),ue=ce[0],ie=ce[1];(0,i.useEffect)((function(){ee.setFieldsValue({paymentWay:"BANK"})}),[]);var oe=function(){var t=(0,r.Z)((function(t){var n,r,l,u;return(0,c.__generator)(this,(function(c){switch(c.label){case 0:return c.trys.push([0,2,,3]),void 0===t.selectedPaymentForms||0===t.selectedPaymentForms.length?(y.ZP.error("Please select atleast one payment"),[2]):(L(!0),n=(0,s.Z)((0,a.Z)({},t),{title:ne}),console.log("data submitted",n),[4,(0,C.pd)(n)]);case 1:return(r=c.sent())&&(y.ZP.success("Payment saved succesfully"),l="/print/"+r.id,e.push(l),L(!1),ee.resetFields(),Y([]),ee.setFieldsValue({paymentWay:"BANK"}),le("BANK"),U(null)),[3,3];case 2:return u=c.sent(),console.log(u),L(!1),y.ZP.error("Something went wrong please try again"),[3,3];case 3:return[2]}}))}));return function(e){return t.apply(this,arguments)}}(),de=function(){var e=(0,r.Z)((function(e){var t,n,r;return(0,c.__generator)(this,(function(a){switch(a.label){case 0:return a.trys.push([0,2,,3]),L(!0),K(!1),t={studentId:e},[4,(0,N.sR)(t)];case 1:return n=a.sent(),console.log("student",n),n&&(L(!1),U(n),Y(n.paymentForms)),[3,3];case 2:return r=a.sent(),console.log("student error",r),L(!1),K(!0),[3,3];case 3:return[2]}}))}));return function(t){return e.apply(this,arguments)}}(),ye=function(e,t){var n=t,r=!0,a=!1,s=void 0;try{for(var l,c=function(){var e=l.value,t=X.find((function(t){return t.id===e})),r=Q.departement.departementPaymentPrices.find((function(e){return e.paymentTypeId===t.paymentTypeId})).price;null!=Q.discount&&Q.discount>0&&t.paymentType.isPaymentWay&&(r*=(100-parseInt(Q.discount))/100,console.log("price\t",r));n+=parseFloat(r)},u=e[Symbol.iterator]();!(r=(l=u.next()).done);r=!0)c()}catch(i){a=!0,s=i}finally{try{r||null==u.return||u.return()}finally{if(a)throw s}}ee.setFieldsValue({total:n})},me=function(){var e=(0,r.Z)((function(e){return(0,c.__generator)(this,(function(t){return e?he(e,B):B([]),[2]}))}));return function(t){return e.apply(this,arguments)}}(),he=function(e,t){I&&(clearTimeout(I),I=null),T=e;var n=function(){var n=(0,r.Z)((function(){var n,r,a;return(0,c.__generator)(this,(function(s){switch(s.label){case 0:return s.trys.push([0,2,,3]),n={searchId:e},[4,(0,N.pW)(n)];case 1:return r=s.sent(),T===e&&t(r),[3,3];case 2:return a=s.sent(),console.log(a),[3,3];case 3:return[2]}}))}));return function(){return n.apply(this,arguments)}}();I=setTimeout(n,300)};return(0,u.jsx)(P.Z,{children:(0,u.jsx)(o.Z,{className:"mx-8 px-8 py-4 h-full my-4",children:(0,u.jsx)(A,{className:"p-4 bg-white ml-2 px-8",children:(0,u.jsx)(m.Z,{loading:G||V,children:(0,u.jsxs)("div",{children:[q&&(0,u.jsx)(k.Z,{className:"my-4"}),(0,u.jsxs)(d.Z,(0,s.Z)((0,a.Z)({},D),{form:ee,size:"large",layout:"vertical",onFinish:oe,children:[(0,u.jsx)(h.Z,{title:ne,loading:H,children:(0,u.jsxs)(p.Z,{children:[(0,u.jsxs)(f.Z,{span:14,children:[(0,u.jsx)(d.Z.Item,{className:"w-full",label:"Student",name:"studentId",rules:[{required:!0}],children:(0,u.jsx)(Z.Z,{showSearch:!0,placeholder:"Search student by id",defaultActiveFirstOption:!1,showArrow:!1,filterOption:!1,onSearch:me,onChange:function(e){de(e)},notFoundContent:(0,u.jsx)("p",{children:"No student found"}),children:(n||[]).map((function(e){return(0,u.jsxs)(Z.Z.Option,{value:e.id,children:[(0,u.jsx)("b",{children:e.collageId})," | ",e.name]},e.id)}))})}),Q&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(d.Z.Item,{required:!0,label:"Select payments",id:"payment-forms-group",name:"selectedPaymentForms",children:(0,u.jsx)(g.Z.Group,{onChange:function(e){var t=ee.getFieldValue("penality")?parseFloat(ee.getFieldValue("penality")):0,n="",r=!0,a=!1,s=void 0;try{for(var l,c=function(){var e=l.value,t=X.find((function(t){return t.id===e}));0==n.length?n+=t.title:n+=" & ".concat(t.title)},u=e[Symbol.iterator]();!(r=(l=u.next()).done);r=!0)c()}catch(i){a=!0,s=i}finally{try{r||null==u.return||u.return()}finally{if(a)throw s}}re(n),ye(e,t),console.log(e)},className:"w-full vertical-checkbox",children:0==X.length?(0,u.jsx)(v.Z,{direction:"vertical",style:{width:"100%"},className:"my-2",children:(0,u.jsx)(x.Z,{message:"Looks like this student has no remaining payment. Please create new payment form or check on reports for possible payment",type:"warning"})}):X.map((function(e){var t=Q.departement.departementPaymentPrices.find((function(t){return t.paymentTypeId===e.paymentTypeId})),n=t.price,r=!1;null!=Q.discount&&Q.discount>0&&e.paymentType.isPaymentWay&&(n*=(100-parseInt(Q.discount))/100,r=!0);return t&&(0,u.jsx)(p.Z,{children:(0,u.jsxs)(g.Z,{name:e.id,value:e.id,children:[" ",e.title," :"," ",(0,u.jsxs)("b",{className:"txt-primary",children:[n," birr"," ",r&&(0,u.jsxs)("span",{className:"txt-warning",children:["Has ",Q.discount,"% discount"]})," "]})]})},e.id)}))})}),(0,u.jsxs)(g.Z,{name:"hasPenality",onChange:function(e){var t=e.target.checked;ie(t)},value:ue,children:[" ","Has Penality"]}),ue&&(0,u.jsx)(d.Z.Item,{label:"Penality",name:"penality",className:"w-full",rules:[{required:!0}],children:(0,u.jsx)(S.Z,{placeholder:"0",onChange:function(e){var t=ee.getFieldValue("selectedPaymentForms");ye(t,e)},className:"w-full"})}),(0,u.jsx)(d.Z.Item,{label:"Total",name:"total",className:"w-full",children:(0,u.jsx)(b.Z,{type:"text",defaultValue:0,className:"w-full"})})]})]}),(0,u.jsx)(f.Z,{span:10,className:" px-8",children:(0,u.jsxs)(h.Z,{children:[(0,u.jsx)(d.Z.Item,{label:"Attachment No.",name:"attachmentNo",rules:[{required:!0}],children:(0,u.jsx)(b.Z,{type:"text"})}),(0,u.jsx)(d.Z.Item,{rules:[{required:!0}],label:"Payment way",id:"payment-radio-group",name:"paymentWay",children:(0,u.jsx)(j.ZP.Group,{options:E,onChange:function(e){var t=e.target.value;le(t)},value:se})}),"CHECK"==se&&(0,u.jsx)(d.Z.Item,{rules:[{required:!0}],label:"Check No",id:"payment-radio-group",name:"checkNo",children:(0,u.jsx)(b.Z,{placeholder:"Enter check no"})})]})})]})}),(0,u.jsx)(d.Z.Item,{className:"mt-4",children:(0,u.jsx)(w.Z,{placement:"rightTop",title:"Are you sure you want to save this attachment?",okButtonProps:{type:"default",htmlType:"submit",className:"bg-warning"},okText:"Yes save!",onConfirm:ee.submit,description:"Please make sure all values are valid before you submit",children:(0,u.jsx)(_.Z,{className:"bg-primary",type:"primary",htmlType:"button",size:"large",children:"Save & Print"})})})]}))]})})})})})}},2166:(e,t,n)=>{"use strict";n.d(t,{BS:()=>h,DR:()=>u,Fx:()=>y,S0:()=>p,cT:()=>i,pd:()=>m,r$:()=>d,yw:()=>o});var r=n(3842),a=n(9312),s=n(1072),l=n(8625),c=n(5396),u=(function(){var e=(0,r.Z)((function(){var e;return(0,a.__generator)(this,(function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,l.Z.sendSync(s.j4.checkAndInitializePaymentTypesCall)];case 1:return e=t.sent(),[2,(0,c.Z)(e)];case 2:return[2,t.sent()];case 3:return[2]}}))}))}(),function(){var e=(0,r.Z)((function(){var e;return(0,a.__generator)(this,(function(t){switch(t.label){case 0:return[4,l.Z.sendSync(s.j4.fetchPaymentTypesCall)];case 1:return e=t.sent(),[2,(0,c.Z)(e)]}}))}));return function(){return e.apply(this,arguments)}}()),i=function(){var e=(0,r.Z)((function(){var e;return(0,a.__generator)(this,(function(t){switch(t.label){case 0:return[4,l.Z.sendSync(s.j4.fetchPaymentFormDataCall)];case 1:return e=t.sent(),[2,(0,c.Z)(e)]}}))}));return function(){return e.apply(this,arguments)}}(),o=function(){var e=(0,r.Z)((function(e){var t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return[4,l.Z.sendSync(s.j4.changePaymentTypeStatusCall,e)];case 1:return t=n.sent(),[2,(0,c.Z)(t)]}}))}));return function(t){return e.apply(this,arguments)}}(),d=(function(){var e=(0,r.Z)((function(e){var t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return[4,l.Z.sendSync(s.j4.createPaymentTypeCall,JSON.stringify(e))];case 1:return t=n.sent(),[2,(0,c.Z)(t)]}}))}))}(),function(){var e=(0,r.Z)((function(){var e,t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return"Test payment",1,"attachment","null",1e3,e={title:"Test payment",studentId:1,attachmentNo:"attachment",checkNo:"null",total:1e3,payments:[{paymentId:1,paymentTypeId:1,price:1e3,month:2,year:2020}]},[4,l.Z.sendSync(s.j4.addPaymentCall,e)];case 1:return t=n.sent(),console.log("**********************",t),[2,(0,c.Z)(t)]}}))}))}(),function(){var e=(0,r.Z)((function(){return(0,a.__generator)(this,(function(e){switch(e.label){case 0:return[4,l.Z.sendSync(s.j4.fetchPaymentFormsCall)];case 1:return[2,e.sent()]}}))}))}(),function(){var e=(0,r.Z)((function(e){var t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return[4,l.Z.sendSync(s.j4.createPaymentFormCall,e)];case 1:return t=n.sent(),[2,(0,c.Z)(t)]}}))}));return function(t){return e.apply(this,arguments)}}()),y=function(){var e=(0,r.Z)((function(e){var t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return[4,l.Z.sendSync(s.j4.changePaymentFormStateCall,e)];case 1:return t=n.sent(),[2,(0,c.Z)(t)]}}))}));return function(t){return e.apply(this,arguments)}}(),m=(function(){var e=(0,r.Z)((function(e){var t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return[4,l.Z.sendSync(s.j4.fetchPaymentFormsForDepartementCall,e)];case 1:return t=n.sent(),[2,(0,c.Z)(t)]}}))}))}(),function(){var e=(0,r.Z)((function(e){var t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return[4,l.Z.sendSync(s.j4.savePaymentCall,e)];case 1:return t=n.sent(),[2,(0,c.Z)(t)]}}))}));return function(t){return e.apply(this,arguments)}}()),h=(function(){var e=(0,r.Z)((function(){var e;return(0,a.__generator)(this,(function(t){switch(t.label){case 0:return[4,l.Z.sendSync(s.j4.fetchPaymentsCall)];case 1:return e=t.sent(),[2,(0,c.Z)(e)]}}))}))}(),function(){var e=(0,r.Z)((function(e){var t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return[4,l.Z.sendSync(s.j4.getPaymentDetailsCall,e)];case 1:return t=n.sent(),[2,(0,c.Z)(t)]}}))}));return function(t){return e.apply(this,arguments)}}()),p=function(){var e=(0,r.Z)((function(e){var t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return[4,l.Z.sendSync(s.j4.getMonthlyPaymentResports,e)];case 1:return t=n.sent(),[2,(0,c.Z)(t)]}}))}));return function(t){return e.apply(this,arguments)}}()},2256:(e,t,n)=>{"use strict";n.d(t,{hR:()=>u,kt:()=>i,pW:()=>o,sR:()=>d});var r=n(3842),a=n(9312),s=n(1072),l=n(8625),c=n(5396),u=function(){var e=(0,r.Z)((function(){var e;return(0,a.__generator)(this,(function(t){switch(t.label){case 0:return[4,l.Z.sendSync(s.ay.getAllStudentsCall)];case 1:return e=t.sent(),[2,(0,c.Z)(e)]}}))}));return function(){return e.apply(this,arguments)}}(),i=(function(){var e=(0,r.Z)((function(){var e;return(0,a.__generator)(this,(function(t){switch(t.label){case 0:return[4,l.Z.sendSync(s.ay.getStudentsWithLessData)];case 1:return e=t.sent(),[2,(0,c.Z)(e)]}}))}))}(),function(){var e=(0,r.Z)((function(e){var t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return[4,l.Z.sendSync(s.ay.createStudentCall,e)];case 1:return t=n.sent(),[2,(0,c.Z)(t)]}}))}));return function(t){return e.apply(this,arguments)}}()),o=function(){var e=(0,r.Z)((function(e){var t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return[4,l.Z.sendSync(s.ay.searchStudentsById,e)];case 1:return t=n.sent(),[2,(0,c.Z)(t)]}}))}));return function(t){return e.apply(this,arguments)}}(),d=function(){var e=(0,r.Z)((function(e){var t;return(0,a.__generator)(this,(function(n){switch(n.label){case 0:return[4,l.Z.sendSync(s.ay.getStudentPaymentFormInformation,e)];case 1:return t=n.sent(),[2,(0,c.Z)(t)]}}))}));return function(t){return e.apply(this,arguments)}}()},1072:(e,t,n)=>{"use strict";n.d(t,{M:()=>l,N5:()=>a,ay:()=>s,j4:()=>r});var r={fetchPaymentTypesCall:"get-all-payment-types",createPaymentTypeCall:"create-payment-type",checkAndInitializePaymentTypesCall:"check-and-initialize-payment-types",changePaymentTypeStatusCall:"change-payment-type-status",addPaymentCall:"add-payment-call",fetchPaymentFormsCall:"get-all-payment-forms",createPaymentFormCall:"create-payment-form",fetchPaymentFormDataCall:"get-payment-form-data",changePaymentFormStateCall:"change-payment-form-status",fetchPaymentFormsForDepartementCall:"fetch-payment-forms-for-departement",savePaymentCall:"save-payment",fetchPaymentsCall:"get-all-payments",getPaymentDetailsCall:"get-payment-details",getMonthlyPaymentResports:"get-monthly-payment-resports",getStudentPaymentReports:"get-student-payment-resports"},a={getAllDepartementsCall:"get-all-departements",createDepartementCall:"create-departement",deleteDepartementCall:"delete-departement"},s={getAllStudentsCall:"get-all-students",createStudentCall:"create-student",deleteStudentCall:"delete-student",getStudentsWithLessData:"get-students-with-less-data",searchStudentsById:"search-students-by-id",getStudentPaymentFormInformation:"get-student-payment-form-information"},l={exportDbCalls:"export-db-calls",importDbCalls:"import-db-calls"}},8625:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});const r=require("electron");const a=n.n(r)().ipcRenderer||!1},5396:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=function(e){try{var t=JSON.parse(e);return console.log("%c Success response:","color:white; background: green",t),t}catch(n){throw console.log("%c Error response: ","color:white; background:red",e),n}}},9554:(e,t,n)=>{"use strict";n.d(t,{c:()=>r});var r="Something went wrong please try again"},6677:(e,t,n)=>{e.exports=n(5817)},7282:e=>{"use strict";e.exports=require("process")}},e=>{e.O(0,[884,382,18,167,774,888,179],(()=>{return t=1556,e(e.s=t);var t}));var t=e.O();_N_E=t}]);