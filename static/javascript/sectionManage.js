var sectionManageObj = {
    ProvinceList: [],
       initForm: function () {
           site_address.forEach(function (aa, bb) {
               if (aa.TopID == 0) {
                   sectionManageObj.ProvinceList.push(aa)
               }
           });
           sectionManageObj.bindaddresscombox('', '', '');
           $("#City").combobox({ data: [] })
           $("#County").combobox({ data: [] })
       },
       bindaddresscombox: function (province, city, county) {
           $("#Province").combobox({
               data: sectionManageObj.ProvinceList,
               valueField: "ID",
               textField: "AddName",
               onChange: function (newvalue) {
                   $("#City").combobox({
                       data: sectionManageObj.getsiteaddress(newvalue)
                   })
                   $("#County").combobox({
                       data: []
                   })
               }
           });
           $("#City").combobox({
               valueField: "ID",
               textField: "AddName",
               onChange: function (newvalue) {
                   $("#County").combobox({
                       data: sectionManageObj.getsiteaddress(newvalue)
                   })
               }
           });
           $("#County").combobox({
               valueField: "ID",
               textField: "AddName"
           });
       },
       getsiteaddress: function (pID) {
           var newlist = [];
           site_address.forEach(function (aa, bb) {
               if (aa.TopID == pID) {
                   newlist.push(aa)
               }
           })
           return newlist;
       }
   }