(global.webpackChunk_N_E=global.webpackChunk_N_E||[]).push([[867],{3265:(e,t,n)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/manage",function(){return n(4559)}])},4559:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>ie});var r=n(4246),s=n(7378),a=n(4426),i=n(3515),c=n(3041),l=n(1410),o=n(8308),u=n(2281);var d=n(8468),m=n(3842),x=n(2050),p=n(9312),h=n(1300),f=n(1058),g=n(5062),y=n(374),j=n(5234),Z=n(1176),v=n(47),b=function(e){var t=e.title;return(0,r.jsx)("div",{className:"w-full mb-2 ",children:(0,r.jsx)("h5",{className:"font-medium w-full leading-tight text-xl mt-0 !mb-0 txt-primary",children:t})})},N=function(e){var t=e.title,n=e.extraInformations,s=e.actionButtons;return(0,r.jsxs)("div",{className:"lg:flex lg:items-center lg:justify-between",children:[(0,r.jsxs)("div",{className:"min-w-0 flex-1",children:[(0,r.jsx)("h2",{className:"text-lg font-bold leading-7 txt-primary",children:t}),n&&(0,r.jsx)("div",{className:"mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6",children:n.map((function(e){return(0,r.jsxs)("div",{className:"mt-2 flex items-center text-sm text-gray-500",children:[e.icon?e.icon:(0,r.jsx)(v.Z,{}),e.info]})}))})]}),(0,r.jsx)("div",{className:"mt-5 flex lg:mt-0 lg:ml-4",children:s&&s.map((function(e){return(0,r.jsx)("span",{className:"sm:ml-3",children:e})}))})]})},w=n(2166),S=n(1875),I=n(489),P="Something went wrong please try again";const C=function(e){var t=e.message,n=void 0===t?P:t;return(0,r.jsx)(S.Z,{direction:"vertical",style:{width:"100%"},className:"my-2",children:(0,r.jsx)(I.Z,{message:n,type:"error"})})};const k=function(){var e=[{title:"Payment type",dataIndex:"name"},{title:"Code",dataIndex:"code"},{title:"Status",dataIndex:"isActive",render:function(e,t){return(0,r.jsx)(h.Z,{checked:e,onChange:function(){return I(t)}})}}],t=(0,s.useState)(!1),n=t[0],a=t[1],i=(0,s.useState)(!1),c=(i[0],i[1],(0,s.useState)(!1)),l=c[0],o=c[1],u=(0,s.useState)([]),d=u[0],v=u[1],N=(0,x.Z)(f.ZP.useMessage(),2),S=(N[0],N[1],function(){var e=(0,m.Z)((function(){var e,t;return(0,p.__generator)(this,(function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),o(!1),a(!0),[4,(0,w.DR)()];case 1:return(e=n.sent())&&(v(e),a(!1)),[3,3];case 2:return t=n.sent(),console.log("%c updated response ","background: red; color: #fff",t),o(!0),a(!1),[3,3];case 3:return[2]}}))}));return function(){return e.apply(this,arguments)}}());(0,s.useEffect)((function(){S()}),[]);var I=function(){var e=(0,m.Z)((function(e){var t,n,r,s;return(0,p.__generator)(this,(function(i){switch(i.label){case 0:return i.trys.push([0,2,,3]),a(!0),t={id:e.id},[4,(0,w.yw)(t)];case 1:return n=i.sent(),r=d.map((function(e){return e.id===n.id?n:e})),v(r),f.ZP.success("Status updated successfully!"),a(!1),[3,3];case 2:return s=i.sent(),console.log("%c e ","background: red; color: #fff",s),a(!1),f.ZP.error(P),[3,3];case 3:return[2]}}))}));return function(t){return e.apply(this,arguments)}}();return(0,r.jsxs)("div",{children:[(0,r.jsxs)(g.Z,{children:[(0,r.jsx)(y.Z,{span:12,children:(0,r.jsx)(b,{title:"Payment Types"})}),(0,r.jsx)(y.Z,{span:12})]}),(0,r.jsx)(j.Z,{className:"bg-primary w-full"}),l&&(0,r.jsx)(C,{className:"my-4"}),(0,r.jsx)(Z.Z,{loading:n,columns:e,bordered:!0,size:"sm",dataSource:d},"id")]})};var T=n(9722),_=n(3444),F=n(5226),A=n(8540),q=n(4813),D=n(5427),R=n(637),E=n(3361),H=n(6591),Y=n(881),z=n(3851),O=Z.Z.ColumnGroup,W=Z.Z.Column;const B=function(){var e=(0,s.useState)(!1),t=e[0],n=e[1],a=(0,s.useState)(!1),i=a[0],c=a[1],l=(0,s.useState)([]),o=l[0],u=l[1],d=(0,s.useState)([]),h=d[0],j=d[1],v=(0,x.Z)(F.Z.useForm(),1)[0],N=(0,s.useState)(!1),S=N[0],I=N[1],P=function(){I(!1)},k=function(){var e=(0,m.Z)((function(){var e,t,r;return(0,p.__generator)(this,(function(s){switch(s.label){case 0:return s.trys.push([0,3,,4]),c(!1),n(!0),[4,(0,z.GT)()];case 1:return e=s.sent(),[4,(0,w.DR)()];case 2:return(t=s.sent())&&e&&(u(e),j(t),n(!1)),[3,4];case 3:return r=s.sent(),console.log(r),c(!0),n(!1),[3,4];case 4:return[2]}}))}));return function(){return e.apply(this,arguments)}}();(0,s.useEffect)((function(){k()}),[]);var B=function(){var e=(0,m.Z)((function(e){var t,r,s,a;return(0,p.__generator)(this,(function(i){switch(i.label){case 0:return i.trys.push([0,2,,3]),o.filter((function(t){return t.name.toLowerCase()===e.name.toLowerCase()})).length>0?(f.ZP.error("Departement with the same name already exists!"),[2]):(n(!0),t=(0,T.Z)({},e),[4,(0,z.EC)(t)]);case 1:return r=i.sent(),s=(0,_.Z)(o).concat([r]),u(s),setTimeout((function(){n(!1),f.ZP.success("Departement information saved successfully"),v.resetFields(),P()}),1e3),[3,3];case 2:return a=i.sent(),console.log("Saving departement errror: ",a),f.ZP.error("Can't save departement information please try again"),n(!1),[3,3];case 3:return[2]}}))}));return function(t){return e.apply(this,arguments)}}(),M=function(){var e=(0,m.Z)((function(e){var t,r;return(0,p.__generator)(this,(function(s){switch(s.label){case 0:return s.trys.push([0,2,,3]),n(!0),[4,(0,z.Yt)(e)];case 1:return s.sent()&&(t=o.filter((function(t){return t.id!=e})),setTimeout((function(){f.ZP.success("Departement deleted successfully"),u(t),n(!1)}),1e3)),[3,3];case 2:return r=s.sent(),console.log("Saving departement errror: ",r),f.ZP.error("Can't save departement information please try again"),n(!1),[3,3];case 3:return[2]}}))}));return function(t){return e.apply(this,arguments)}}();return(0,r.jsxs)("div",{children:[(0,r.jsx)(A.Z,{title:"Add new departement information",open:S,footer:null,onOk:P,onCancel:function(){I(!1)},children:(0,r.jsx)(q.Z,{loading:t,children:(0,r.jsxs)(F.Z,{form:v,size:"middle",layout:"vertical",onFinish:B,children:[(0,r.jsx)(F.Z.Item,{label:"Name",name:"name",rules:[{required:!0}],children:(0,r.jsx)(D.Z,{placeholder:"Enter name here"})}),(0,r.jsxs)(g.Z,{gutter:[16,16],children:[(0,r.jsx)(y.Z,{span:12,children:(0,r.jsx)(F.Z.Item,{label:"Total Credit Hr",name:"totalCreditHour",rules:[{required:!0,message:"# of credit hr is required"}],children:(0,r.jsx)(R.Z,{placeholder:"0",className:"w-full"})})}),(0,r.jsx)(y.Z,{span:12,children:(0,r.jsx)(F.Z.Item,{label:"Price per Credit Hr",name:"pricePerCreditHour",rules:[{required:!0,message:"Price/credit hr is required"}],children:(0,r.jsx)(R.Z,{placeholder:"0",className:"w-full"})})})]}),(0,r.jsxs)(g.Z,{gutter:[16,16],children:[(0,r.jsx)(y.Z,{span:16,children:(0,r.jsx)(F.Z.Item,{label:"Payment Type",name:"paymentTypeId",rules:[{required:!0,message:"Payment type is required"}],children:(0,r.jsx)(E.Z,{children:h.filter((function(e){return e.isPaymentWay})).map((function(e){return(0,r.jsxs)(E.Z.Option,{value:e.id,children:[" ",e.name," "]})}))})})}),(0,r.jsx)(y.Z,{span:8,children:(0,r.jsx)(F.Z.Item,{label:"#credit hours",name:"creditHoursPerPaymentWay",rules:[{required:!0,message:"Required"}],children:(0,r.jsx)(R.Z,{placeholder:"0"})})})]}),(0,r.jsx)(F.Z.Item,{label:"Registration fee",name:"registrationPrice",rules:[{required:!0,message:"Registration can't be empty"}],children:(0,r.jsx)(R.Z,{placeholder:"0"})}),(0,r.jsx)(F.Z.Item,{children:(0,r.jsx)(H.Z,{className:"bg-primary",type:"primary",htmlType:"submit",children:"Submit"})})]})})}),(0,r.jsxs)(g.Z,{children:[(0,r.jsx)(y.Z,{span:16,children:(0,r.jsx)(b,{title:"Departements"})}),(0,r.jsx)(y.Z,{span:8,className:"text-end",children:(0,r.jsx)(H.Z,{className:"bg-primary",onClick:function(){I(!0)},children:"Add New"})})]}),i&&(0,r.jsx)(C,{className:"my-4"}),(0,r.jsxs)(Z.Z,{className:"pt-4",pagination:{pageSize:5},rowClassName:"group",loading:t,bordered:!0,size:"sm",dataSource:o,children:[(0,r.jsx)(W,{title:"Name",dataIndex:"name",render:function(e,t){return(0,r.jsxs)(r.Fragment,{children:[e,(0,r.jsx)(Y.Z,{title:"Are you sure you want to delete departement : ".concat(e),description:"Are you sure to delete this departement?",okText:"Yes delete!",okButtonProps:{classNames:"!bg-danger",danger:!0},placement:"topRight",cancelText:"Cancel",onConfirm:function(){return M(t.id)},children:(0,r.jsx)("a",{href:"#",className:"!txt-danger pl-2 opacity-0 group-hover:opacity-100 transition ease-in-out",children:"Delete"})})]})}},"name"),(0,r.jsx)(W,{title:"Price per credit hr.",dataIndex:"pricePerCreditHour"},"pricePerCreditHour"),(0,r.jsx)(W,{title:"Registration fee",dataIndex:"departementPaymentPrices",render:function(e){console.log("Registration");var t=h.filter((function(e){return"REGISTRATION"===e.code}));if(console.log("regIds: ",t),t.length>0){var n=e.filter((function(e){return e.paymentTypeId===t[0].id}));if(console.log("pays: ",n),n.length>0)return(0,r.jsxs)(r.Fragment,{children:[n[0].price," birr"]})}return(0,r.jsx)(r.Fragment,{children:"-"})}},"registrationDepPayment"),(0,r.jsxs)(O,{title:"Payment Way",children:[(0,r.jsx)(W,{title:"Name",dataIndex:"paymentWay",render:function(e){return(0,r.jsx)(r.Fragment,{children:e.name})}},"paymentWayName"),(0,r.jsx)(W,{title:"Credit hr",dataIndex:"creditHoursPerPaymentWay"},"creditHoursPerPaymentWay"),(0,r.jsx)(W,{title:"Total",dataIndex:"paymentWay",render:function(e,t){return(0,r.jsxs)(r.Fragment,{children:[t.creditHoursPerPaymentWay*t.pricePerCreditHour," "]})}},"totalPaymentOnPaymentWay")]})]},"id")]})};var M=n(169),G=n(1328),L=n(2256),X=n(1320),K=n.n(X),Q=Z.Z.Column;const J=function(){var e=(0,s.useState)(!1),t=e[0],n=e[1],a=(0,s.useState)(!1),i=(a[0],a[1],(0,s.useState)(!1)),c=i[0],l=i[1],o=(0,s.useState)([]),u=o[0],d=o[1],h=(0,s.useState)([]),g=h[0],y=h[1],j=(0,x.Z)(F.Z.useForm(),1)[0],v=(0,s.useState)(!1),b=v[0],w=v[1],S=function(){w(!1)},I=function(){var e=(0,m.Z)((function(){var e,t,r;return(0,p.__generator)(this,(function(s){switch(s.label){case 0:return s.trys.push([0,3,,4]),l(!1),n(!0),[4,(0,L.h)()];case 1:return e=s.sent(),[4,(0,z.GT)()];case 2:return t=s.sent(),e&&t&&(d(e),y(t),n(!1)),[3,4];case 3:return r=s.sent(),console.log(r),l(!0),n(!1),[3,4];case 4:return[2]}}))}));return function(){return e.apply(this,arguments)}}();(0,s.useEffect)((function(){I()}),[]);var P=function(){var e=(0,m.Z)((function(e){var t,r,s,a;return(0,p.__generator)(this,(function(i){switch(i.label){case 0:return i.trys.push([0,2,,3]),u.filter((function(t){return t.collageId.toLowerCase()===e.collageId.toLowerCase()})).length>0?(f.ZP.error("Student with the same id already exists!"),[2]):(n(!0),t=(0,M.Z)((0,T.Z)({},e),{registeredAt:e.registeredAt.toISOString()}),[4,(0,L.k)(t)]);case 1:return r=i.sent(),s=(0,_.Z)(u).concat([r]),d(s),setTimeout((function(){n(!1),f.ZP.success("Student information saved successfully"),j.resetFields(),S()}),1e3),[3,3];case 2:return a=i.sent(),console.log("Saving student errror: ",a),f.ZP.error("Can't save student information please try again"),n(!1),[3,3];case 3:return[2]}}))}));return function(t){return e.apply(this,arguments)}}();return(0,r.jsxs)("div",{children:[(0,r.jsx)(A.Z,{title:"Register New Student",open:b,footer:null,onOk:S,onCancel:function(){w(!1)},children:(0,r.jsx)(q.Z,{loading:t,children:(0,r.jsxs)(F.Z,{form:j,size:"middle",layout:"vertical",onFinish:P,children:[(0,r.jsx)(F.Z.Item,{label:"Full Name",name:"name",rules:[{required:!0}],children:(0,r.jsx)(D.Z,{placeholder:"Enter full name here"})}),(0,r.jsx)(F.Z.Item,{label:"ID",name:"collageId",rules:[{required:!0,message:"Student id can't be empty"}],children:(0,r.jsx)(D.Z,{placeholder:"Enter student ID"})}),(0,r.jsx)(F.Z.Item,{label:"Departement",name:"departementId",rules:[{required:!0,message:"Student departement is required"}],children:(0,r.jsx)(E.Z,{placeholder:"Select departement",children:g.map((function(e){return(0,r.jsxs)(E.Z.Option,{value:e.id,children:[" ",e.name," "]})}))})}),(0,r.jsx)(F.Z.Item,{label:"Registered at",name:"registeredAt",required:!0,children:(0,r.jsx)(G.Z,{format:"YYYY-MM-DD HH:mm:ss"})}),(0,r.jsx)(F.Z.Item,{children:(0,r.jsx)(H.Z,{className:"bg-primary",type:"primary",htmlType:"submit",children:"Save"})})]})})}),(0,r.jsx)(N,{title:"Students",actionButtons:[(0,r.jsx)(H.Z,{className:"bg-primary",type:"primary",onClick:function(){w(!0)},children:"Register"})]}),c&&(0,r.jsx)(C,{className:"my-4"}),(0,r.jsxs)(Z.Z,{className:"pt-4",pagination:{pageSize:5},rowClassName:"group",loading:t,bordered:!0,size:"xs",dataSource:u,children:[(0,r.jsx)(Q,{title:"ID",dataIndex:"collageId",render:function(e,t){return(0,r.jsxs)(r.Fragment,{children:[e,(0,r.jsx)(Y.Z,{title:"Are you sure you want to delete student : ".concat(t.name),description:"Are you sure to delete this student?",okText:"Yes delete!",okButtonProps:{classnames:"!bg-danger",danger:!0},placement:"topRight",cancelText:"Cancel",onConfirm:function(){t.id},children:(0,r.jsx)("a",{href:"#",className:"!txt-danger pl-2 opacity-0 group-hover:opacity-100 transition ease-in-out",children:"Delete"})})]})}},"collageId"),(0,r.jsx)(Q,{title:"Full Name",dataIndex:"name"},"name"),(0,r.jsx)(Q,{title:"Departement",dataIndex:"departement",render:function(e){return e.name}},"departement"),(0,r.jsx)(Q,{title:"Registered at",dataIndex:"registeredAt",render:function(e){return(0,r.jsxs)(r.Fragment,{children:[" ",K()(e).format("D/MM/YYYY")," "]})}},"registeredAt"),(0,r.jsx)(Q,{title:"Status",dataIndex:"isActive",render:function(e,t){return(0,r.jsxs)(r.Fragment,{children:[" ",e?(0,r.jsx)("p",{className:"text-green-500",children:"Active"}):(0,r.jsx)("p",{className:"text-red-500",children:"Inactive"})]})}},"isActive")]},"id")]})};var U=n(1114),V=Z.Z.Column;const $=function(){var e=(0,s.useState)(!1),t=e[0],n=e[1],a=(0,s.useState)(!1),i=a[0],c=a[1],l=(0,s.useState)([]),o=l[0],u=l[1],d=(0,s.useState)(!1),x=d[0],h=d[1],g=function(){h(!1)},y=function(){h(!1)},j=function(){var e=(0,m.Z)((function(){var e,t;return(0,p.__generator)(this,(function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),c(!1),n(!0),[4,(0,w.cT)()];case 1:return e=r.sent(),console.log(e),e&&(u(e),n(!1)),[3,3];case 2:return t=r.sent(),console.log(t),c(!0),n(!1),[3,3];case 3:return[2]}}))}));return function(){return e.apply(this,arguments)}}();(0,s.useEffect)((function(){j()}),[]);var v=function(){var e=(0,m.Z)((function(e,t){var r,s,a,i;return(0,p.__generator)(this,(function(c){switch(c.label){case 0:return c.trys.push([0,2,,3]),r={id:e,status:t},n(!0),[4,(0,w.Fx)(r)];case 1:return s=c.sent(),console.log(s),s&&(a=o.map((function(t){return t.id===e?s:t})),u(a),f.ZP.success("Status of payment form is updated successfully!"),n(!1)),[3,3];case 2:return i=c.sent(),console.log(i),f.ZP.error("Couldn't update form status please try again"),y(),n(!1),[3,3];case 3:return[2]}}))}));return function(t,n){return e.apply(this,arguments)}}();return(0,r.jsxs)("div",{children:[(0,r.jsx)(A.Z,{title:"Add new payment form",open:x,footer:null,onOk:g,onCancel:y,children:(0,r.jsx)(U.Z,{onNewForm:function(e){var t=(0,_.Z)(o).concat([e]);u(t),f.ZP.success("New form added successfully"),g()}})}),(0,r.jsx)(N,{title:"Payment forms",actionButtons:[(0,r.jsx)(H.Z,{className:"bg-primary",type:"primary",onClick:function(){h(!0)},children:"New Form"})]}),i&&(0,r.jsx)(C,{className:"my-4"}),(0,r.jsxs)(Z.Z,{className:"pt-4",pagination:{pageSize:10},rowClassName:"group",loading:t,bordered:!0,size:"xs",dataSource:o,children:[(0,r.jsx)(V,{title:"Title",dataIndex:"title"},"title"),(0,r.jsx)(V,{title:"Payment Type",dataIndex:"paymentType",render:function(e){return(0,r.jsxs)(r.Fragment,{children:[e.name," "]})}},"paymentType"),(0,r.jsx)(V,{title:"Month",dataIndex:"month",render:function(e){return(0,r.jsxs)(r.Fragment,{children:[null!==e&&void 0!==e?e:"-"," "]})}},"month"),(0,r.jsx)(V,{title:"Semister",dataIndex:"semister",render:function(e){return(0,r.jsxs)(r.Fragment,{children:[null!==e&&void 0!==e?e:"-"," "]})}},"semister"),(0,r.jsx)(V,{title:"Quarter",dataIndex:"quarter",render:function(e){return(0,r.jsxs)(r.Fragment,{children:[null!==e&&void 0!==e?e:"-"," "]})}},"quarter"),(0,r.jsx)(V,{title:"Year",dataIndex:"year",render:function(e){return(0,r.jsxs)(r.Fragment,{children:[null!==e&&void 0!==e?e:"-"," "]})}},"year"),(0,r.jsx)(V,{title:"Status",dataIndex:"isActive",render:function(e){return(0,r.jsxs)(r.Fragment,{children:[e?(0,r.jsx)("span",{className:"txt-warning",children:"Active"}):(0,r.jsx)("span",{className:"txt-success",children:"Completed"})," "]})}},"isActive"),(0,r.jsx)(V,{title:"Actions",dataIndex:"isActive",render:function(e,t){return(0,r.jsxs)(r.Fragment,{children:[e?(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(Y.Z,{title:"Are you sure you want to mark : \n ".concat(t.title," as completed"),description:"Are you sure to mark this payment form?",okText:"Yes mark!",okButtonProps:{classnames:"!bg-danger",danger:!0},placement:"topRight",cancelText:"Cancel",onConfirm:function(){return v(t.id,!1)},children:(0,r.jsx)(H.Z,{className:"bg-success transition ease-in-out",size:"small",children:"Done"})})}):(0,r.jsx)(Y.Z,{title:"Are you sure you want to activate : \n ".concat(t.title," as completed"),description:"Are you sure to activate this payment form?",okText:"Yes activate!",okButtonProps:{classnames:"!bg-danger",danger:!0},placement:"topRight",cancelText:"Cancel",onConfirm:function(){return v(t.id,!0)},children:(0,r.jsx)(H.Z,{className:"bg-warning transition ease-in-out",size:"small",children:"Activate"})})," "]})}},"action")]},"id")]})};a.Z.Header;var ee=a.Z.Content,te=a.Z.Sider,ne="students",re="payments",se="departement",ae="paymentForms";const ie=function(){var e=(0,s.useState)(ne),t=e[0],n=e[1],m=[{key:ne,label:"Students",icon:(0,r.jsx)(c.Z,{})},{key:re,label:"Payments ",icon:(0,r.jsx)(l.Z,{})},{key:se,label:"Departement ",icon:(0,r.jsx)(o.Z,{})},{key:ae,label:"Payment Forms ",icon:(0,r.jsx)(u.Z,{})}],x={backgroundColor:"transparent"};return(0,r.jsxs)(d.Z,{children:[(0,r.jsx)(te,{className:"pt-4 !bg-white",id:"managementSideBar",width:250,children:(0,r.jsx)(i.Z,{onClick:function(e){n(e.key)},selectedKeys:[t],style:{width:250,backgroundColor:"transparent"},items:m.map((function(e){return t=e.label,n=e.key,r=e.icon,{key:n,icon:r,children:s,label:t,style:x};var t,n,r,s}))})}),(0,r.jsx)(a.Z,{className:"w-full",children:(0,r.jsxs)(ee,{className:"p-4 bg-white ml-2 border-1 w-full",children:[t===ne&&(0,r.jsx)(J,{}),t===re&&(0,r.jsx)(k,{}),t===se&&(0,r.jsx)(B,{}),t===ae&&(0,r.jsx)($,{})]})})]})}},2298:e=>{"use strict";e.exports=require("electron")},7282:e=>{"use strict";e.exports=require("process")}},e=>{e.O(0,[259,431,3,51,774,888,179],(()=>{return t=3265,e(e.s=t);var t}));var t=e.O();_N_E=t}]);