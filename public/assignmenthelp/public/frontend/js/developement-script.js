function checkIfEmailInString(text) {
    var re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    return re.test(text);
}

function checkCommonValidation() {
    var chkFlg = true;
    $('#Work_Level_Errors').html('');

    if (checkValueInarray($('#Work_Level_Name').val()) == '0') {
        $('#Work_Level_Errors').html('<em for="Work_Level" class="error1 help-block1" style="bottom: -1.3rem;display:block;position:relative;">Please select your study level</em>');
        chkFlg = false;
    }

    if ($('#OnCountryCode').val() == '') {
        $('#OnCountryCode').addClass('input-error');
        $('#CountryCode_Errors').html('<em for="OnCountryCode" class="error1 help-block1" style="bottom: -1.3rem">Please select country code</em>');
        chkFlg = false;
    }
    if ($('#Timezone_Id').val() == '') {
        $('#onTimezoneId').val('');
        $('#Timezone_Id').addClass('input-error');
        $('#Timezone_Id_Errors').html('<em for="Timezone_Id" class="error1 help-block1" style="bottom: -1.3rem">Please select timezone</em>');
        chkFlg = false;
    } else {
        var TimeZoneIDD = '';
        var item = $.grep(timeZoneJsonlist, function (item) {
            if (item.value == $('#Timezone_Id').val()) {
                TimeZoneIDD = item.data
                return item.value == $('#Timezone_Id').val();
            } else {
                $('#onTimezoneId').val('');
            }
        });
        if (item.length) {
            $('#onTimezoneId').val(TimeZoneIDD);
            $('#Timezone_Id_Errors').html('');
            $('#Timezone_Id').removeClass('input-error');
        } else {
            $('#onTimezoneId').val('');
            $('#Timezone_Id').addClass('input-error');
            $('#Timezone_Id_Errors').html('<em for="Timezone_Id" class="error1 help-block1" style="bottom: -1.3rem">Please select valid timezone</em>');
            chkFlg = false;
        }
    }
    if ($('#ReferenceStyleId').val() != '') {
        var ReferenceStyleIDD = '';
        var item = $.grep(referenceStylelist, function (item) {
            if (item.value == $('#ReferenceStyleId').val()) {
                ReferenceStyleIDD = item.data
                return item.value == $('#ReferenceStyleId').val();
            } else {
                $('#onChangeReference_Style_Id').val('');
            }
        });
        if (item.length) {
            $('#onChangeReference_Style_Id').val(ReferenceStyleIDD);
            $('#Reference_Style_Ids').html('');
            $('#ReferenceStyleId').removeClass('input-error');
        } else {
            $('#onChangeReference_Style_Id').val('');
            $('#ReferenceStyleId').addClass('input-error');
            $('#Reference_Style_Ids').html('<em for="ReferenceStyleId" class="error1 help-block1" style="bottom: -1.3rem">Please select valid reference style</em>');
            chkFlg = false;
        }
    } else {
        $('#onChangeReference_Style_Id').val('');
        $('#Reference_Style_Ids').html('');
        $('#ReferenceStyleId').removeClass('input-error');
    }

    return chkFlg;
}

function validationPricePage() {
    var chkFlg = true;
    var WorkLevel = '';
    var verId = $('.varsionclass').attr('id');
    if (verId == 'mobileVersion') {
        WorkLevel = $('#Work_Level').val();
    }
    if (verId == 'desktopVersion') {
        checkWorklevel = $('.WorkLevel').is(':checked');
        if (checkWorklevel) {
            WorkLevel = $('.WorkLevel:checked').val();
        }
    }
    if (WorkLevel == '') {
        $('#WorkLevelDiv_Error').html('<em for="Work_Level" class="error1 help-block1" style="bottom: -1.3rem;display:block;position:relative;">Please select your study level</em>');
        chkFlg = false;
    } else {
        $('#WorkLevelDiv_Error').html('');
    }
    if ($('#Subject_Name').val() == '') {
        $("#Subject_Name").addClass("invalid");
        $('#SubjectNameDiv').html('<em for="weightage"  class="error1 help-block1">Please select subject</em>');
        chkFlg = false;
    } else {
        var chksub = $('#Subject_Name').val();
        if (chksub == '' || checkIfEmailInString(chksub) || chksub.replace(/[^0-9]/g, "").length > 8) {
            $("#Subject_Name").addClass("invalid");
            $('#SubjectNameDiv').html('<em for="weightage"  class="error1 help-block1">Please enter a valid subject name</em>');
            chkFlg = false;
        } else {
            $("#Subject_Name").removeClass("invalid");
            $('#SubjectNameDiv').html('');
        }
    }
    return chkFlg;
}

var dateObj = new Date();
var month = dateObj.getUTCMonth();
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
$('.datepicker').pickadate({
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekdaysShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    showMonthsShort: true,
    format: 'd mmm, yyyy',
    min: new Date(year, month, day)
});


$(document).on('change', ".datepicker", function (e) {
    var Due_Dates = $("#Due_Date").val();
    if (Due_Dates == '') {
        $("#Due_Date").removeClass("valid");
        $("#Due_Date").addClass("invalid common-input-error");
    } else {
        if ($("#Due_Date").parent().find('em')) {
            $("#Due_Date").parent().find('em').remove();
        }
        $("#Due_Date").removeClass("invalid common-input-error");
        $("#Due_Date").addClass("valid");
    }
});


$(document).on('change', "#homeEmail_ID", function (e) {
    var homeEmail = $(".homeEmail").val();
    if (homeEmail) {
        var chkHomeEmail = /^[a-zA-Z0-9][a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (chkHomeEmail.test(homeEmail) == false) {
            $("#homeEmail_ID").addClass("common-input-error");
        } else {
            $("#homeEmail_ID").removeClass("common-input-error");
        }
    } else {
        $("#homeEmail_ID").addClass("common-input-error");
    }
});

$(document).on('change', ".subjectNameSearch", function (e) {
    if ($('#Subject_Name').val() == '') {
        $("#Subject_Name").addClass("invalid");
        $('#SubjectNameDiv').html('<em for="weightage"  class="error1 help-block1">Please select subject</em>');
        chkFlg = false;
    } else {
        var chksub = $('#Subject_Name').val();
        if (chksub == '' || checkIfEmailInString(chksub) || chksub.replace(/[^0-9]/g, "").length > 8) {
            $("#Subject_Name").addClass("invalid");
            $('#SubjectNameDiv').html('<em for="weightage"  class="error1 help-block1">Please enter a valid subject name</em>');
            chkFlg = false;
        } else {
            $("#Subject_Name").removeClass("invalid");
            $('#SubjectNameDiv').html('');
        }
    }
});
window.onload = function () {
    setTimeout(function () {
        $('#reference_style_div').children('.mdb-select').find('input[type="text"]').attr({
            id: 'reference_style',
            name: 'reference_style'
        });
    }, 1000);
    $('select[required]').css({
        display: 'inline',
        position: 'absolute',
        float: 'left',
        padding: 0,
        margin: 0,
        borderBottom: '1px solid #e53935',
        boxShadow: '0 1px 0 0 #e53935',
        height: 0,
        width: 0,
        top: '2em',
        left: '3em'
    }).parent('.mdb-select').children('input.select-dropdown').addClass('common-input-error');
};
window.onload = function mynewFunction() {
    console.log($('#reference_style_div').children('.mdb-select').find('input[type="text"]'));
    $('#reference_style_div').children('.mdb-select').find('input[type="text"]').attr({
        id: 'reference_style',
        name: 'reference_style'
    });
}
$(function () {
    'use strict';
    $('#element').tooltip('toggle');
    $('.mdb-select').material_select();
    $("#Due_Date").change(function () {
        checkValidDateTime();
    });
    $("#Due_Time_Select").change(function () {
        checkValidDateTime();
    });
    $('#Due_Time_Select').pickatime({twelvehour: true});
    $("#OnCountryCode").change(function () {
        $('#CountryCode_Errors').html('');
        if ($('#OnCountryCode').val() == '') {
            $('#OnCountryCode').addClass('input-error');
            $('#CountryCode_Errors').html('<em for="OnCountryCode" class="error1 help-block1" style="bottom: -1.3rem">Please select country code</em>');
        }
    });
    $(document).on('change', '#Timezone_Id', function () {
        $('#Timezone_Id_Errors').html('');
        if ($('#Timezone_Id').val() == '') {
            $('#onTimezoneId').val('');
            $('#Timezone_Id').addClass('validationClassColor');
            $('#Timezone_Id_Errors').html('<em for="Timezone_Id" class="error1 help-block1" style="bottom: -1.3rem">Please select timezone</em>');
        } else {
            var TimeZoneIDD = '';
            var item = $.grep(timeZoneJsonlist, function (item) {
                if (item.value == $('#Timezone_Id').val()) {
                    TimeZoneIDD = item.data
                    return item.value == $('#Timezone_Id').val();
                } else {
                    $('#onTimezoneId').val('');
                }
            });
            if (item.length) {
                $('#onTimezoneId').val(TimeZoneIDD);
                $('#Timezone_Id_Errors').html('');
                $('#Timezone_Id').removeClass('validationClassColor');
            } else {
                if ($('.autocomplete-selected').text() != '') {
                    $('#Timezone_Id_Errors').html('');
                    $('#Timezone_Id').removeClass('validationClassColor');
                } else {
                    $('#onTimezoneId').val('');
                    $('#Timezone_Id').addClass('validationClassColor');
                    $('#Timezone_Id_Errors').html('<em for="Timezone_Id" class="error1 help-block1" style="bottom: -1.3rem">Please select valid timezone</em>');
                }
            }
        }
    });
    $("#ReferenceStyleId").change(function () {
        $('#Reference_Style_Ids').html('');
        if ($('#ReferenceStyleId').val() != '') {
            var ReferenceStyleIDD = '';
            var item = $.grep(referenceStylelist, function (item) {
                if (item.value == $('#ReferenceStyleId').val()) {
                    ReferenceStyleIDD = item.data
                    $('#ReferenceStyleId').removeClass('validationClassColor');
                    $('#Reference_Style_Ids').html('');
                    return item.value == $('#ReferenceStyleId').val();
                } else {
                    $('#onChangeReference_Style_Id').val('');
                }
            });
            if (item.length) {
                $('#ReferenceStyleId').removeClass('validationClassColor');
                $('#Reference_Style_Ids').html('');
                $('#onChangeReference_Style_Id').val(ReferenceStyleIDD);
            } else {
                if ($('.autocomplete-selected').text() != '') {
                    $('#Reference_Style_Ids').html('');
                    $('#ReferenceStyleId').removeClass('validationClassColor');
                } else {
                    $('#onChangeReference_Style_Id').val('');
                    $('#ReferenceStyleId').addClass('validationClassColor');
                    $('#Reference_Style_Ids').html('<em for="ReferenceStyleId" class="error1 help-block1" style="bottom: -1.3rem">Please select valid reference style</em>');
                }
            }
        } else {
            $('#onChangeReference_Style_Id').val('');
            $('#Reference_Style_Ids').html('');
            $('#ReferenceStyleId').removeClass('validationClassColor');
        }
    });

});

function checkValidDateTime() {
    var Due_Date = $('#Due_Date').val();
    var Due_Time_Select = $("#Due_Time_Select").val();
    var NewDue_Date = Due_Date + ' ' + Due_Time_Select;
    var NewDue_Parse_Date = Date.parse(NewDue_Date);
    var currentdateObj = new Date();
    var c_month = month[currentdateObj.getUTCMonth()];
    var c_day = currentdateObj.getUTCDate();
    var c_year = currentdateObj.getUTCFullYear();
    var c_date = c_day + ' ' + c_month + ', ' + c_year;
    var now = new Date();
    now.setHours(now.getHours());
    var isPM = now.getHours() >= 12;
    var isMidday = now.getHours() == 12;
    var time = [now.getHours() - (isPM && !isMidday ? 12 : 0), now.getMinutes()].join(':') + (isPM ? ' PM' : ' AM');
    var New_c_date = c_date + ' ' + time;
    var New_Parse_c_date = Date.parse(New_c_date);
    if (Due_Date != '' && Due_Time_Select != '' && NewDue_Parse_Date >= New_Parse_c_date) {
        $('#Due_Time_Select').removeClass('invalid  common-input-error');
        $('#checkvalidtime').text('');
        $('#checkvalidtime').hide();
    } else {
        if (Due_Date != '' && Due_Time_Select != '') {
            $('#checkvalidtime').show();
            $('#checkvalidtime').text('Please select valid time');
            $('#Due_Time_Select').addClass('invalid common-input-error');
        } else {
            if (Due_Time_Select != '' && Due_Date == '') {
                $('#Due_Time_Select').removeClass('invalid  common-input-error');
                $('#checkvalidtime').text('');
                $('#checkvalidtime').hide();
            }
        }
    }
}

function ValidTimePic() {
    var Due_Date = $('#Due_Date').val();
    var Due_Time_Select = $("#Due_Time_Select").val();
    var NewDue_Date = Due_Date + ' ' + Due_Time_Select;
    var NewDue_Parse_Date = Date.parse(NewDue_Date);
    var currentdateObj = new Date();
    var c_month = month[currentdateObj.getUTCMonth()];
    var c_day = currentdateObj.getUTCDate();
    var c_year = currentdateObj.getUTCFullYear();
    var c_date = c_day + ' ' + c_month + ', ' + c_year;
    var now = new Date();
    now.setHours(now.getHours());
    var isPM = now.getHours() >= 12;
    var isMidday = now.getHours() == 12;
    var time = [now.getHours() - (isPM && !isMidday ? 12 : 0), now.getMinutes()].join(':') + (isPM ? ' PM' : ' AM');
    var New_c_date = c_date + ' ' + time;
    var New_Parse_c_date = Date.parse(New_c_date);
    if (Due_Date != '' && Due_Time_Select != '' && NewDue_Parse_Date >= New_Parse_c_date) {
        return true;
    } else {
        if (Due_Date != '' && Due_Time_Select != '') {
            return false;
        } else {
            if (Due_Time_Select != '' && Due_Date == '') {
                return true;
            }
        }
    }
}

$(document).ready(function () {


    $(document).on("click", ".showdatepickerh", function () {
        $('#Due_Date').focus();
    });

    $(document).on("click", ".showtimepickerh", function () {
        $('#Due_Time_Select').focus();
    });

    var versionType = '';
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        var a = $(document).width();
        if (a < 767) {
            versionType = 'mobile';
        } else {
            versionType = 'desktop';
        }
        var base_url = $('#base_url').val();
        var CSRF_TOKEN = $('meta[name="csrf_token"]').attr('content');
        if (versionType) {
            $.ajax({
                url: base_url + '/versiontype/' + versionType, type: 'GET', success: function (data) {
                    if (data) {
                        $('#studyworklevelDiv').html(data);
                    }
                }
            });
        }
    } else {
        var b = $(window).width();
        if (b < 767) {
            versionType = 'mobile';
        } else {
            versionType = 'desktop';
        }
        var base_url = $('#base_url').val();
        var CSRF_TOKEN = $('meta[name="csrf_token"]').attr('content');
        if (versionType) {
            $.ajax({
                url: base_url + '/versiontype/' + versionType, type: 'GET', success: function (data) {
                    if (data) {
                        $('#studyworklevelDiv').html(data);
                    }
                }
            });
        }
    }
    var secondstepTimeValue = new Date();
    secondstepTimeValue.setMinutes(secondstepTimeValue.getMinutes() + 10);
    var secondstepHour = secondstepTimeValue.getHours();
    var secondstepMinut = secondstepTimeValue.getMinutes();
    if (secondstepHour > 12) {
        var HAMPM = secondstepHour - 12;
        HAMPM = '0' + HAMPM;
    } else {
        var HAMPM = secondstepHour;
    }
    if (secondstepMinut < 10) {
        var MAMPM = '0' + secondstepMinut;
    } else {
        var MAMPM = secondstepMinut;
    }
    var secondstepAmPm = (secondstepHour > 12) ? (HAMPM + ':' + MAMPM + ' PM') : (HAMPM + ':' + MAMPM + ' AM');
    $('#Due_Time_Select').val(secondstepAmPm);
    $.validator.addMethod("timeValidation", function (value, element) {
        return ValidTimePic();
    }, "Please select valid time");
    $.validator.addMethod("checkValidName", function (value, element) {
        return /^[a-z A-Z.-]+$/.test(value);
    }, "Please enter only alphabet");
    $.validator.addMethod("checkValidEmail", function (value, element) {
        return /^[a-zA-Z0-9][a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);
    }, "Please enter a valid email address");
    $.validator.addMethod("checkSubjectAsEmail", function (value, element) {
        return /^\s*[a-zA-Z0-9,\s]+\s*$/.test(value);
    }, "Please enter a valid subject name");
    $.validator.addMethod("checkSubjectAsPhone", function (value, element) {
        var values = value;
        if (isNaN(values)) {
            var str = values;
            str = str.replace(/[^0-9]+/ig, "");
            var valuel = str.length;
            if (valuel > 6) {
                return false;
            } else {
                return true;
            }
        } else {
            var valuel = values.length;
            if (valuel > 6) {
                return false;
            } else {
                return true;
            }
        }
    }, "Please enter a valid subject name");
    $.validator.addMethod("checkSubject", function (value, element) {
        var sub = $('#Subject_Name').val();
        if (sub == '' || checkIfEmailInString(sub) || sub.replace(/[^0-9]/g, "").length > 8) {
            return false;
        } else {
            return true;
        }
    }, "Please enter a valid subject name");

    $.validator.addMethod("removeTrim", function (value, element) {
        return value.trim();
    }, "Please enter only alphabet not spaces more time");

    /*$('#Subject_Name').focusin(function () {
        $(this).autocomplete().onValueChange();
    });*/
    $('#Subject_Name').autocomplete({
        lookup: subjectListing, onSelect: function (suggestion) {
            $('.SubjectNameLevel').addClass('active');
            $('#Subject_Name').removeClass('common-input-error');
            $("#Subject_Name").next().remove();
            $(".subjectNameSearch").removeClass('invalid');
            $("#SubjectNameDiv").html('');
            $('#Subject_Id').val(suggestion.value);
        }
    });
    $('#CountryCode').focusin(function () {
        $(this).autocomplete().onValueChange();
    });
    $('#CountryCode').autocomplete({
        lookup: countryJsonList, onSelect: function (suggestion) {
            $('#CountryCode').removeClass('input-error');
            $('#CountryCode').removeClass('validationClassColor');
            $('#CountryCode_Errors').html('');
            $('#OnCountryCode').val(suggestion.data);
            $('#CountryCode').val(suggestion.value);
        }
    });
    /*$('#Timezone_Id').focusin(function () {
        $(this).autocomplete().onValueChange();
    });*/
    $('#Timezone_Id').autocomplete({
        lookup: timeZoneJsonlist, onSelect: function (suggestion) {
            $('#Timezone_Id').removeClass('input-error');
            $('#Timezone_Id').removeClass('validationClassColor');
            $('#Timezone_Id_Errors').html('');
            $('.Timezone_IdsLevel').addClass('active');
            $('#onTimezoneId').val(suggestion.data);
            $('#Timezone_Id').val(suggestion.value);
        }
    });
    $('#ReferenceStyleId').focusin(function () {
        $(this).autocomplete().onValueChange();
    });
    $('#ReferenceStyleId').autocomplete({
        lookup: referenceStylelist, onSelect: function (suggestion) {
            $('#ReferenceStyleId').removeClass('input-error');
            $('#ReferenceStyleId').removeClass('validationClassColor');
            $('#Reference_Style_Ids').html('');
            $('.ReferenceStyleIdLevel').addClass('active');
            $('#onChangeReference_Style_Id').val(suggestion.data);
            $('#ReferenceStyleId').val(suggestion.value);
        }
    });
    /*$('#Work_Level_Name').focusin(function () {
        $(this).autocomplete().onValueChange();
    });*/
    $('#Work_Level_Name').autocomplete({
        lookup: worklevelJsonlist,
        onSelect: function (suggestion) {
            $('#Work_Level_Id').val(suggestion.data);
            $('#Work_Level_Name').val(suggestion.value);
            $('#Work_Level_Errors').html('');
        }
    });
    $('#contact_subject').focusin(function () {
        $(this).autocomplete().onValueChange();
    });
    $('#contact_subject').autocomplete({
        lookup: subjectListing, onSelect: function (suggestion) {
            $('.contactsubjectLevel').addClass('active');
            $('#contact_subject_id').val(suggestion.value);
        }
    });
});
$(document).on('click', ".clockpicker-button", function (e) {
    var Due_Time_Select = $("#Due_Time_Select").val();
    if (Due_Time_Select == '') {
        $("#Due_Time_Select").removeClass("valid");
        $("#Due_Time_Select").addClass("invalid input-error");
    }
});


$(document).on('blur', "#Work_Level_Name", function (e) {

    var Work_Level_Name_Here = $("#Work_Level_Name").val();

    if (Work_Level_Name_Here) {
        var checkHere = checkValueInarray(Work_Level_Name_Here);
        if (checkHere) {
            $('#Work_Level_Errors').html('');
            $("#Work_Level_Id").val(checkHere);

        } else {
            $('#Work_Level_Errors').html('<em for="Work_Level" class="error1 help-block1" style="bottom: -1.3rem;display:block;position:relative;">Please select your study level</em>');
            $("#Work_Level_Id").val('');
        }
    } else {
        $('#Work_Level_Errors').html('<em for="Work_Level" class="error1 help-block1" style="bottom: -1.3rem;display:block;position:relative;">Please select your study level</em>');
        $("#Work_Level_Id").val('');
    }

});


var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
$("#orderForm").validate({
    rules: {
        Email: {
            required: {
                depends: function () {
                    $(this).val($.trim($(this).val()));
                    return true;
                }
            }, email: true, checkValidEmail: true
        },
        Phone: {number: true, minlength: 5, maxlength: 15},
        Subject_Name: {required: true, checkSubject: true},
        Due_Date: {required: true},
        Due_Time_Select: {required: true, timeValidation: true},
        Work_Level_Name: {
            required: true
        },
        Reference_Style_Id: {required: true},
        Timezone_Id: {required: true},
        Details: {required: true}
    },
    messages: {
        Email: {required: "Please enter an email address"},
        Phone: {
            number: "Please enter valid phone number",
            minlength: "Phone number must be greater than 4 digit",
            maxlength: "Phone number must be less than 16 digit"
        },
        Subject_Name: {required: "Please select subject"},
        Due_Date: {required: "Please select date"},
        Due_Time_Select: {required: "Please select date time"},
        Work_Level_Name: {required: "Please select study level"},
        Reference_Style_Id: {required: "Please select reference style"},
        Timezone_Id: {required: "Please select Timezone"},
        Details: {required: "Please  enter details"}
    },
    errorElement: "em",
    errorPlacement: function (error, element) {
        error.addClass("help-block").css('bottom', '-1.3rem');
        if (element.prop("type") === "checkbox") {
            error.insertAfter(element.parent("label"));
        } else if (element.prop("type") === "radio") {
            error.css({'top': element.parent("fieldset").parent(".row").outerHeight() + 20 + 'px'}).insertAfter(element.parent("fieldset").parent(".row"));
        } else if (element.hasClass('mdb-select')) {
            error.insertAfter(element);
        } else {
            error.insertAfter(element);
        }
    },
    highlight: function (element, errorClass, validClass) {
        $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
        $(element).addClass("input-error");
        checkCommonValidation();
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
        $(element).removeClass("input-error");
    }
});
$(document).on('keypress', '.OrderFormCls', newOrderFormFunc).on('click', '#orderNow', newOrderFormFunc);

function newOrderFormFunc(e) {
    if (e.which == 13 || e.type == 'click') {
        checkCommonValidation();
        e.preventDefault();
        var checkValidation = $("#orderForm").valid();
        if (checkValidation == false) {
            $("#orderForm").validate({}).focusInvalid();
            return false;
        } else {
            var base_url = $('#base_url').val();
            var CSRF_TOKEN = $('meta[name="csrf_token"]').attr('content');
            var Subject_Name = $('#Subject_Name').val();
            if (Subject_Name == undefined || Subject_Name == null) {
                Subject_Name = '';
            }
            var formData = new FormData($('#orderForm')[0]);
            formData.append('_token', CSRF_TOKEN);
            formData.append('Subject_Name', Subject_Name);
            formData.append('Pages', $('#pagesValues').val());
            var Due_Date = $('#Due_Date').val();
            var Due_Time_Select = $("#Due_Time_Select").val();
            var NewDue_Date = Due_Date + ' ' + Due_Time_Select;
            var NewDue_Parse_Date = Date.parse(NewDue_Date);
            var currentdateObj = new Date();
            var c_month = month[currentdateObj.getUTCMonth()];
            var c_day = currentdateObj.getUTCDate();
            var c_year = currentdateObj.getUTCFullYear();
            var c_date = c_day + ' ' + c_month + ', ' + c_year;
            var now = new Date();
            now.setHours(now.getHours());
            var isPM = now.getHours() >= 12;
            var isMidday = now.getHours() == 12;
            var time = [now.getHours() - (isPM && !isMidday ? 12 : 0), now.getMinutes()].join(':') + (isPM ? ' PM' : ' AM');
            var New_c_date = c_date + ' ' + time;
            var New_Parse_c_date = Date.parse(New_c_date);
            var checkFlag = true;
            var checkEmails = $("#Email").val();
            var checkPhone = $("#Phone").val();
            if (NewDue_Parse_Date >= New_Parse_c_date) {
                $('#Due_Time_Select').removeClass('invalid');
                $('#checkvalidtime').text('');
                $('#checkvalidtime').hide();
                if (checkCommonValidation()) {
                    $('#showErrorMsg').text('');
                    $('#orderNow').prop('disabled', true);
                    $('.OrderFormCls').prop('disabled', true);

                    $.ajax({
                        url: base_url + '/orderpost',
                        type: 'POST',
                        data: formData,
                        contentType: false,
                        processData: false,
                        beforeSend: function () {
                            $("#orderNow").hide();
                            $("#orderNowbutton").show();
                        },
                        success: function (data) {
                            $('#Email_Errors').html('');
                            $('#CountryCode_Errors').html('');
                            $('#Phone_Errors').html('');
                            $('#Work_Level_Errors').html('');
                            $('#Subject_Name_Errors').html('');
                            $('#Pages_Errors').html('');
                            $('#Due_Date_Errors').html('');
                            $('#Due_Time_Select_Errors').html('');
                            $('#Timezone_Id_Errors').html('');
                            $('#Details_Errors').html('');
                            if (data['status_code'] == '701') {
                                $('#Email_Errors').html('<em for="Email" class="error help-block">' + data['Email'] + '</em>');
                                $('#CountryCode_Errors').html('<em for="CountryCode" class="error help-block">' + data['CountryCode'] + '</em>');
                                $('#Phone_Errors').html('<em for="Phone" class="error help-block">' + data['Phone'] + '</em>');
                                $('#Work_Level_Errors').html('<em for="Work_Level" class="error help-block">' + data['Work_Level'] + '</em>');
                                $('#Subject_Name_Errors').html('<em for="Subject_Name" class="error help-block">' + data['Subject_Name'] + '</em>');
                                $('#Pages_Errors').html('<em for="Pages" class="error help-block">' + data['Pages'] + '</em>');
                                $('#Due_Date_Errors').html('<em for="Due_Date" class="error help-block">' + data['Due_Date'] + '</em>');
                                $('#Due_Time_Select_Errors').html('<em for="Due_Time_Select" class="error help-block">' + data['Due_Time'] + '</em>');
                                $('#Timezone_Id_Errors').html('<em for="Timezone_Id" class="error help-block">' + data['Timezone_Id'] + '</em>');
                                $('#Details_Errors').html('<em for="Details" class="error help-block">' + data['Details'] + '</em>');
                                $('.OrderFormCls').prop('disabled', false);
                                $('#orderNow').prop('disabled', false);
                                $("#orderForm").valid();
                                $("#orderNow").show();
                                $("#orderNowbutton").hide();
                            } else {
                                if (data['Status'] == '1') {
                                    document.getElementById('orderForm').reset();
                                    var orderId = data['Data']['Order_Id'];
                                    window.location.href = base_url + '/studentpanel/price-quote/' + orderId;
                                } else if (data['status_code'] == 711) {
                                    $("#errorApiHeaderResponse").modal("show");
                                    $(".errorApiHeaderResponse").attr('response-code', data['response_code']).attr('response-text', data['response_text']).html('<div class="alert-warning alert">' + data['message'] + '</div>');
                                    setTimeoutErrorModal("errorApiHeaderResponse", 120000);
                                } else {
                                    $('.OrderFormCls').prop('disabled', false);
                                    if (data['status_code'] == '707') {
                                        $('#showErrorMsg').text(data['message']);
                                        $('#orderNow').prop('disabled', false);
                                        $("#orderNowbutton").hide();
                                        $("#orderNow").show();
                                    } else {
                                        $('#showErrorMsg').text(data['message']);
                                        $('#orderNow').prop('disabled', false);
                                        $("#orderNowbutton").hide();
                                        $("#orderNow").show();
                                    }
                                }
                            }
                        }
                    });
                }
            } else {
                $('#Due_Time_Select').addClass('invalid');
                $('#checkvalidtime').show();
                $('#checkvalidtime').text('Please select valid time');
            }
        }
    }
}

$("#SecondorderForm").validate({
    rules: {
        Email: {
            required: {
                depends: function () {
                    $(this).val($.trim($(this).val()));
                    return true;
                }
            }, email: true, checkValidEmail: true
        },
        Phone: {number: true, minlength: 5, maxlength: 15},
        Subject_Name: {required: true, checkSubject: true},
        Due_Date: {required: true},
        Due_Time_Select: {required: true, timeValidation: true},
        Work_Level_Name: {
            required: true
        },
        Reference_Style_Id: {required: true},
        Timezone_Id: {required: true},
        Details: {required: true}
    },
    messages: {
        Email: {required: "Please enter an email address"},
        Phone: {
            number: "Please enter valid phone number",
            minlength: "Phone number must be greater than 4 digit",
            maxlength: "Phone number must be less than 16 digit"
        },
        Subject_Name: {required: "Please select subject"},
        Due_Date: {required: "Please select date"},
        Due_Time_Select: {required: "Please select date time"},
        Work_Level_Name: {required: ""},
        Reference_Style_Id: {required: "Please select reference style"},
        Timezone_Id: {required: "Please select Timezone"},
        Details: {required: "Please  enter details"}
    },
    errorElement: "em",
    errorPlacement: function (error, element) {
        error.addClass("help-block").css('bottom', '-1.3rem');
        if (element.prop("type") === "checkbox") {
            error.insertAfter(element.parent("label"));
        } else if (element.prop("type") === "radio") {
            error.css({'top': element.parent("fieldset").parent(".row").outerHeight() + 'px'}).insertAfter(element.parent("fieldset").parent(".row"));
        } else if (element.hasClass('mdb-select')) {
            error.insertAfter(element);
        } else if (element.prop("type") === "text") {
            error.insertAfter(element);
        } else {
            error.css('bottom', '-1.3rem');
            error.insertAfter(element);
        }
    },
    highlight: function (element, errorClass, validClass) {
        $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
        $(element).addClass("input-error");
        checkCommonValidation();
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
        $(element).removeClass("input-error");
    }
});
$(document).on('keypress', '.SecondStepOrderFormCls', SecondStepOrderFormFun).on('click', '#secondStepOrderNow', SecondStepOrderFormFun);

function SecondStepOrderFormFun(e) {
    if (e.which == 13 || e.type == 'click') {
        checkCommonValidation();
        e.preventDefault();
        var checkValidation = $("#SecondorderForm").valid();
        if (checkValidation == false) {
            $("#SecondorderForm").validate({}).focusInvalid();
            return false;
        } else {
            var base_url = $('#base_url').val();
            var CSRF_TOKEN = $('meta[name="csrf_token"]').attr('content');
            var Subject_Name = $('#Subject_Name').val();
            if (Subject_Name == undefined || Subject_Name == null) {
                Subject_Name = '';
            }
            var formData = new FormData($('#SecondorderForm')[0]);
            formData.append('_token', CSRF_TOKEN);
            formData.append('Subject_Name', Subject_Name);
            formData.append('Pages', $('#pagesValues').val());
            var Due_Date = $('#Due_Date').val();
            var Due_Time_Select = $("#Due_Time_Select").val();
            var NewDue_Date = Due_Date + ' ' + Due_Time_Select;
            var NewDue_Parse_Date = Date.parse(NewDue_Date);
            var currentdateObj = new Date();
            var c_month = month[currentdateObj.getUTCMonth()];
            var c_day = currentdateObj.getUTCDate();
            var c_year = currentdateObj.getUTCFullYear();
            var c_date = c_day + ' ' + c_month + ', ' + c_year;
            var now = new Date();
            now.setHours(now.getHours());
            var isPM = now.getHours() >= 12;
            var isMidday = now.getHours() == 12;
            var time = [now.getHours() - (isPM && !isMidday ? 12 : 0), now.getMinutes()].join(':') + (isPM ? ' PM' : ' AM');
            var New_c_date = c_date + ' ' + time;
            var New_Parse_c_date = Date.parse(New_c_date);
            var checkFlag = true;
            var checkEmails = $("#Email").val();
            var checkPhone = $("#Phone").val();
            if (NewDue_Parse_Date >= New_Parse_c_date) {
                $('#Due_Time_Select').removeClass('invalid');
                $('#checkvalidtime').text('');
                $('#checkvalidtime').hide();
                if (checkCommonValidation()) {
                    $('#showErrorMsg').text('');
                    $('#secondStepOrderNow').prop('disabled', true);
                    $('.SecondStepOrderFormCls').prop('disabled', true);
                    $.ajax({
                        url: base_url + '/orderpost',
                        type: 'POST',
                        data: formData,
                        contentType: false,
                        processData: false,
                        beforeSend: function () {
                            $("#secondStepOrderNow").hide();
                            $("#secondSteporderNowbutton").show();
                        },
                        success: function (data) {
                            $('#Email_Errors').html('');
                            $('#CountryCode_Errors').html('');
                            $('#Phone_Errors').html('');
                            $('#Work_Level_Errors').html('');
                            $('#Subject_Name_Errors').html('');
                            $('#Pages_Errors').html('');
                            $('#Due_Date_Errors').html('');
                            $('#Due_Time_Select_Errors').html('');
                            $('#Timezone_Id_Errors').html('');
                            $('#Details_Errors').html('');
                            if (data['status_code'] == '701') {
                                $('#Email_Errors').html('<em for="Email" class="error help-block">' + data['Email'] + '</em>');
                                $('#CountryCode_Errors').html('<em for="CountryCode" class="error help-block">' + data['CountryCode'] + '</em>');
                                $('#Phone_Errors').html('<em for="Phone" class="error help-block">' + data['Phone'] + '</em>');
                                $('#Work_Level_Errors').html('<em for="Work_Level" class="error help-block">' + data['Work_Level'] + '</em>');
                                $('#Subject_Name_Errors').html('<em for="Subject_Name" class="error help-block">' + data['Subject_Name'] + '</em>');
                                $('#Pages_Errors').html('<em for="Pages" class="error help-block">' + data['Pages'] + '</em>');
                                $('#Due_Date_Errors').html('<em for="Due_Date" class="error help-block">' + data['Due_Date'] + '</em>');
                                $('#Due_Time_Select_Errors').html('<em for="Due_Time_Select" class="error help-block">' + data['Due_Time'] + '</em>');
                                $('#Timezone_Id_Errors').html('<em for="Timezone_Id" class="error help-block">' + data['Timezone_Id'] + '</em>');
                                $('#Details_Errors').html('<em for="Details" class="error help-block">' + data['Details'] + '</em>');
                                $('.SecondStepOrderFormCls').prop('disabled', false);
                                $('#secondStepOrderNow').prop('disabled', false);
                                $("#SecondorderForm").valid();
                                $("#secondStepOrderNow").show();
                                $("#secondSteporderNowbutton").hide();
                            } else {
                                if (data['Status'] == '1') {
                                    $('#orderNow').prop('disabled', true);
                                    document.getElementById('SecondorderForm').reset();
                                    var orderId = data['Data']['Order_Id'];
                                    window.location.href = base_url + '/studentpanel/price-quote/' + orderId;
                                } else if (data['status_code'] == 711) {
                                    $("#errorApiHeaderResponse").modal("show");
                                    $(".errorApiHeaderResponse").attr('response-code', data['response_code']).attr('response-text', data['response_text']).html('<div class="alert-warning alert">' + data['message'] + '</div>');
                                    setTimeoutErrorModal("errorApiHeaderResponse", 120000);
                                } else {
                                    $('.SecondStepOrderFormCls').prop('disabled', false);
                                    if (data['status_code'] == '707') {
                                        $('#showErrorMsg').text(data['message']);
                                        $('#secondStepOrderNow').prop('disabled', false);
                                        $("#secondSteporderNowbutton").hide();
                                        $("#secondStepOrderNow").show();
                                    } else {
                                        $('#showErrorMsg').text(data['message']);
                                        $('#secondStepOrderNow').prop('disabled', false);
                                        $("#secondSteporderNowbutton").hide();
                                        $("#secondStepOrderNow").show();
                                    }
                                }
                            }
                        }
                    });
                }
            } else {
                $('#Due_Time_Select').addClass('invalid');
                $('#checkvalidtime').show();
                $('#checkvalidtime').text('Please select valid time');
            }
        }
    }
}

$("#contactUsForm").validate({
    rules: {
        contact_name: {required: true, checkValidName: true},
        contact_email: {required: true, email: true,},
        contact_phone: {number: true, minlength: 5, maxlength: 15,},
        contact_subject: {checkSubject: true},
        contact_message: {required: true, minlength: 1, maxlength: 500,},
    },
    messages: {
        contact_name: {required: "Please enter name"},
        contact_email: {required: "Please enter an email address"},
        contact_phone: {
            number: "Please enter valid phone number",
            minlength: "Please enter phone number atleat 5 digit",
            maxlength: "Please enter phone number maximum 15 digit"
        },
        contact_subject: {checkSubject: ""},
        contact_message: {
            required: "Please enter message details",
            minlength: "Please enter message at least one character",
            maxlength: "Please enter message maximum 500 characters"
        }
    },
    errorElement: "em",
    errorPlacement: function (error, element) {
        error.addClass("help-block").css('bottom', '-1.3rem');
        if (element.prop("type") === "checkbox") {
            error.insertAfter(element.parent("label"));
        } else {
            error.insertAfter(element);
        }
    },
    highlight: function (element, errorClass, validClass) {
        $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
        $(element).addClass("input-error");
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
        $(element).removeClass("input-error");
    }
});
$(document).on('keypress', '.contactNowClass', contactUsFormFun).on('click', '#contactNowButton', contactUsFormFun);

function contactUsFormFun(e) {
    if (e.which == 13 || e.type == 'click') {
        e.preventDefault();
        var checkValidation = $("#contactUsForm").valid();
        if (checkValidation) {
            var formData = new FormData($('#contactUsForm')[0]);
            var base_url = $('#base_url').val();
            var CSRF_TOKEN = $('meta[name="csrf_token"]').attr('content');
            formData.append('_token', CSRF_TOKEN);
            $.ajax({
                url: base_url + '/contactuspostdata',
                type: 'POST',
                data: formData,
                dataType: 'json',
                contentType: false,
                processData: false,
                beforeSend: function () {
                    $('#contactNowButton').hide();
                    $('#contactNowbuttonLloding').show();
                },
                success: function (data) {
                    $('#ContactFormcontact_name_Error').html('');
                    $('#ContactFormcontact_email_Error').html('');
                    $('#ContactFormSubject_Name_Error').html('');
                    $('.allreadyMsgContact').text('');
                    $('#contactNowbuttonLloding').hide();
                    $('#contactNowButton').show();
                    if (data.status_code == '702') {
                        $('.allreadyMsgContact').text(data.message);
                        $('#centralModalContact').modal();
                        $('#contact_name').val('');
                        $('#contact_email').val('');
                        $('#contact_phone').val('');
                        $('#subject_id').val('');
                        $('#Subject_Name').val('');
                        $('#contact_message').val('');
                    } else {
                        if (data.status_code == '700') {
                            $('.allreadyMsgContact').text(data.message);
                            $('#centralModalContact').modal();
                        } else {
                            if (data.status_code == '701') {
                                $('#ContactFormcontact_name_Error').html(data.contact_name);
                                $('#ContactFormcontact_email_Error').html(data.contact_email);
                                $('#ContactFormcontact_message_Error').html(data.contact_message);
                                $('#contactNowButton').show();
                                $('#contactNowbuttonLloding').hide();
                            } else {
                                $('.allreadyMsgContact').text(data.message);
                                $('#centralModalContact').modal();
                            }
                        }
                    }
                }
            });
        }
    }
}

$("#Pages").change(function () {
    if ($(this).val()) {
        var pWords = 250;
        var pagesVal = $(this).val();
        var totalWordsOnHome = parseInt(pagesVal) * parseInt(pWords);
        $("#PagesWords").val(totalWordsOnHome);
    } else {
        $("#PagesWords").val('');
    }
});
$("#formOnHome").validate({
    rules: {
        Email: {
            required: {
                depends: function () {
                    $(this).val($.trim($(this).val()));
                    return true;
                }
            }, email: true, checkValidEmail: true
        },
        Subject_Name: {required: true, removeTrim: true, checkSubject: true},
        Due_Date: {required: true, removeTrim: true},
        Pages: {required: true, removeTrim: true}
    },
    messages: {
        Email: {required: "", email: "", checkValidEmail: ""},
        Subject_Name: {required: "", checkSubject: ""},
        Due_Date: {required: ""},
        Pages: {required: ""}
    },
    errorElement: "em",
    errorPlacement: function (error, element) {
        error.addClass("help-block");
        if (element.prop("type") === "checkbox") {
            error.insertAfter(element.parent("label"));
        } else {
            error.insertAfter(element);
        }
    },
    highlight: function (element, errorClass, validClass) {
        $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
        $(element).addClass("common-input-error");
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
        $(element).removeClass("common-input-error");
    }
});

$(document).on('keypress', '.homeformclass', homeFormFunc).on('click', '#buttonFormHome', homeFormFunc);

function homeFormFunc(e) {
    if (e.which == 13 || e.type == 'click') {
        e.preventDefault();
        var checkValidation = $("#formOnHome").valid();
        if (checkValidation == false) {
            $("#formOnHome").validate({}).focusInvalid();
            return false;
        } else {
            var base_url = $('#base_url').val();
            var CSRF_TOKEN = $('meta[name="csrf_token"]').attr('content');
            var formData = new FormData($('#formOnHome')[0]);
            formData.append('_token', CSRF_TOKEN);
            formData.append('Pages', $('#pagesValues').val());
            formData.append('PagesWords', $('#PagesWords').val());
            $.ajax({
                url: base_url + '/placeyourorder',
                type: 'POST',
                data: formData,
                dataType: 'json',
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data.satus == 1) {
                        $(".HomeEmailClass_Error").removeClass('common-input-error');
                        $(".HomeSubject_NameClass_Error").removeClass('common-input-error');
                        $(".HomeDue_DateClass_Error").removeClass('common-input-error');
                        $(".HomePagesClass_Error").removeClass('common-input-error');
                        window.location.href = base_url + '/order';
                    } else {
                        if (data.status_code == 701) {
                            $(".HomeEmailClass_Error").addClass('common-input-error');
                            $(".HomeSubject_NameClass_Error").addClass('common-input-error');
                            $(".HomeDue_DateClass_Error").addClass('common-input-error');
                            $(".HomePagesClass_Error").addClass('common-input-error');
                        } else {
                            $(".HomeEmailClass_Error").removeClass('common-input-error');
                            $(".HomeSubject_NameClass_Error").removeClass('common-input-error');
                            $(".HomeDue_DateClass_Error").removeClass('common-input-error');
                            $(".HomePagesClass_Error").removeClass('common-input-error');
                        }
                    }
                }
            });
        }
    }
}

$("#placeOrderForm").validate({
    rules: {
        Email: {
            required: {
                depends: function () {
                    $(this).val($.trim($(this).val()));
                    return true;
                }
            },
            email: true, checkValidEmail: true
        },
        Subject_Name: {required: true, checkSubject: true},
        Due_Date: {required: true}
    },
    messages: {
        Email: {required: "Please enter an email address"},
        Subject_Name: {required: "Please select subject"},
        Due_Date: {required: "Please select date"}
    },
    errorElement: "em",
    errorPlacement: function (error, element) {
        error.addClass("help-block");
        if (element.prop("type") === "checkbox") {
            error.insertAfter(element.parent("label"));
        } else {
            error.insertAfter(element);
        }
    },
    highlight: function (element, errorClass, validClass) {
        $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
        $(element).addClass("input-error");
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
        $(element).removeClass("input-error");
    }
});
$(document).on('keypress', '.wigitclassfun', sidebarFormFun).on('click', '#placeYourorderNow', sidebarFormFun);

function sidebarFormFun(e) {
    if (e.which == 13 || e.type == 'click') {
        e.preventDefault();
        var checkValidation = $("#placeOrderForm").valid();
        if (checkValidation == false) {
            $("#placeOrderForm").validate({}).focusInvalid();
            return false;
        } else {

            var base_url = $('#base_url').val();
            var CSRF_TOKEN = $('meta[name="csrf_token"]').attr('content');
            var formData = new FormData($('#placeOrderForm')[0]);
            formData.append('_token', CSRF_TOKEN);
            formData.append('Pages', $('#pagesValues').val());
            formData.append('PagesWords', $('#PagesWords').val());
            $.ajax({
                url: base_url + '/placeyourorder',
                type: 'POST',
                data: formData,
                dataType: 'json',
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data.satus == 1) {
                        $("#wigitEmail_Error").html('');
                        $("#wigitSubject_Name_Error").html('');
                        $("#wigitDue_Date_Error").html('');
                        $("#wigitPages_Error").html('');
                        $("#wigitPagesWords_Error").html('');
                        window.location.href = base_url + '/secondstep';
                    } else {
                        if (data.status_code == 701) {
                            $("#wigitEmail_Error").html(data.Email);
                            $("#wigitSubject_Name_Error").html(data.Subject_Name);
                            $("#wigitDue_Date_Error").html(data.Due_Date);
                            $("#wigitPages_Error").html(data.Pages);
                            $("#wigitPagesWords_Error").html(data.PagesWords);
                        } else {
                            $("#wigitEmail_Error").html('');
                            $("#wigitSubject_Name_Error").html('');
                            $("#wigitDue_Date_Error").html('');
                            $("#wigitPages_Error").html('');
                            $("#wigitPagesWords_Error").html('');
                        }
                    }
                }
            });
        }
    }
}

$(document).ready(function () {
    var base_url = $('#base_url').val();
    var CSRF_TOKEN = $('meta[name="csrf_token"]').attr('content');
    $('#drag-and-drop-zone').dmUploader({
        url: base_url + '/fileupload?Type=orders',
        dataType: 'JSON',
        extraData: {"_token": CSRF_TOKEN, "Type": JSON.stringify('orders'), "filerename": rename},
        onNewFile: function (id, file) {
            add_file('#demo-files', id, file, 'orders');
        },
        onComplete: function () {
            $('#orderNow').prop("disabled", false);
            $('#secondStepOrderNow').prop("disabled", false);
            $("#demo-files2-error").html('');
        },
        onUploadProgress: function (id, percent) {
            var percentStr = percent + '%';
            file_add_progress_bar('#demo-files2-error', percent, percentStr);
            $('#orderNow').prop("disabled", true);
            $('#secondStepOrderNow').prop("disabled", true);
        },
        onFileTypeError: function (file) {
            $("#demo-files2-error").html(file.name + ' cannot be added: file type is wrong');
            error_message_hide('#demo-files2-error');
        },
        onFileSizeError: function (file) {
            $("#demo-files2-error").html(file.name + "The file can't be uploaded, because it exceeds the maximum file size less than (11 MB) for this site");
            error_message_hide('#demo-files2-error');
        },
        onFileExtError: function (file) {
            $("#demo-files2-error").html(file.name + ' cannot be added: file extension is wrong');
            error_message_hide('#demo-files2-error');
        }
    });
});

function delfile(Type, File) {
    $.post($('#base_url').val() + '/filedelete?imgName=' + File, {
        Type: Type,
        File: File,
        _token: $('meta[name="csrf_token"]').attr('content'),
    }, function (data) {
    });
}

function add_file(showid, e, d, type) {
    if ((d.name.replace(/[^a-zA-Z0-9.-]+/g, "")).length > 20) {
        var filename = (d.name.replace(/[^a-zA-Z0-9.-]+/g, "")).substring(0, 17) + '...';
    } else {
        var filename = d.name.replace(/[^a-zA-Z0-9.-]+/g, "");
    }
    var f = '<li class="" id="demo-file' + e + '"> <input type="hidden" name="allFiles[]" value="' + d.user + '"> <span class="demo-file-id">' + "</span>" + filename + '<a href="javascript:;" onclick="delfile(\'' + type + '\',\'' + d.user + '\');$(this).parent().remove();" title="Remove" class="fa fa-trash"><i class="glyphicon glyphicon-trash" style="color:grey; font-size:11px;"></i></a></li>';
    $(showid).prepend(f);
}

function self_add_file(showid, e, d, type) {
    var f = '<li class="attached-list" id="demo-file' + e + '"><span class="demo-file-id">' + "</span>" + d.name + '</li>';
    $(showid).prepend(f);
}

function file_add_progress_bar(id, percent, percentStr) {
    $(id).html('<div class="progress progress-striped active" style="clear:both; margin-top:5px;"><div class="progress-bar progress-bar-success" role="progressbar" style="width: ' + percentStr + '" aria-valuenow="' + percent + '" aria-valuemin="0" aria-valuemax="100"></div></div>');
}

function error_message_hide(id) {
    setTimeout('$("#demo-files2-error").hide()', 3000);
    $(id).css("display", "block");
}

function getJobsChecked() {
    var arr = [];
    var i = 0;
    $('.checkSubjectToSend:checked').each(function () {
        arr[i++] = $(this).val();
    });
    return arr;
}

$(document).ready(function () {
    var IDD = $('.listButton').attr('id');
    $('#' + IDD).text('SELECTED');
    $('#' + IDD).removeClass('hidden');
    $('#LId' + IDD).addClass('addActive');
    var defaultOffer = 20;
    defaultOffer = parseFloat(defaultOffer);
    defaultPrice = parseFloat($('.ACTLLPRICE').val());
    var defaultofferprices = (defaultPrice * defaultOffer) / 100;
    var defaultsaveprices = defaultPrice - defaultofferprices;
    $('#offerValue').text('GBP' + defaultPrice.toFixed(2));
    $('#offerPriceValue').text('GBP' + defaultsaveprices.toFixed(2));
    $('#savePriceValue').text('GBP' + defaultofferprices.toFixed(2));
    var orderpageCounter = $('#pagesValues').val();
    if (orderpageCounter > 1) {
        var pageCounter = parseInt(orderpageCounter);
        var wordsCounter = 250;
    } else {
        var pageCounter = 1;
        var wordsCounter = 250;
    }
    $("#checkPricePlus").on("click", function (e) {
        e.preventDefault();
        pageCounter++;
        $('#pagesValues').val(pageCounter);
        var totalWords = parseInt(pageCounter) * parseInt(wordsCounter);
        $('#totalPage').val(pageCounter + ' Pages / ' + totalWords + ' Words');
        $('#PagesWords').val(totalWords);
        $('.LPRICE').each(function () {
            var lprice = $('.LPRICELSIST' + this.id).val();
            var lTotalPrice = parseInt(pageCounter) * parseFloat(lprice);
            var sprice = $('.SPRICELSIST' + this.id).val();
            var STotalPrice = parseInt(pageCounter) * parseFloat(sprice);
            $('.ACTLLPRICELSIST' + this.id).val(lTotalPrice);
            $('.ACTLSPRICELSIST' + this.id).val(STotalPrice);
            $('.LPRICELSISTTEXTVALUE' + this.id).text('GBP' + lTotalPrice.toFixed(2));
            $('.SPRICELSISTTEXTVALUE' + this.id).text('GBP' + STotalPrice.toFixed(2));
            var getActiveVal = $('.addActive').attr('id');
            var getSelected = $('.SELECTED' + getActiveVal).val();
            defaultOffer = parseFloat(defaultOffer);
            defaultPrice = parseFloat(getSelected);
            defaultofferprices = (defaultPrice * defaultOffer) / 100;
            defaultsaveprices = defaultPrice - defaultofferprices;
            $('#offerValue').text('GBP' + defaultPrice.toFixed(2));
            $('#offerPriceValue').text('GBP' + defaultsaveprices.toFixed(2));
            $('#savePriceValue').text('GBP' + defaultofferprices.toFixed(2));
        });
    });
    $("#checkPriceMinus").on("click", function (e) {
        e.preventDefault();
        if (pageCounter != 1) {
            pageCounter--;
            $('#pagesValues').val(pageCounter);
            var totalWords = parseInt(pageCounter) * parseInt(wordsCounter);
            if (pageCounter == 1) {
                $('#totalPage').val('1 Page / 250 Words');
            } else {
                $('#totalPage').val(pageCounter + ' Pages / ' + totalWords + ' Words');
            }
            $('#PagesWords').val(totalWords);
            $('.LPRICE').each(function () {
                var lprice = $('.LPRICELSIST' + this.id).val();
                var lTotalPrice = parseInt(pageCounter) * parseFloat(lprice);
                var sprice = $('.SPRICELSIST' + this.id).val();
                var STotalPrice = parseInt(pageCounter) * parseFloat(sprice);
                $('.ACTLLPRICELSIST' + this.id).val(lTotalPrice);
                $('.ACTLSPRICELSIST' + this.id).val(STotalPrice);
                $('.LPRICELSISTTEXTVALUE' + this.id).text('GBP' + lTotalPrice.toFixed(2));
                $('.SPRICELSISTTEXTVALUE' + this.id).text('GBP' + STotalPrice.toFixed(2));
                var getActiveVal = $('.addActive').attr('id');
                var getSelected = $('.SELECTED' + getActiveVal).val();
                defaultOffer = parseFloat(defaultOffer);
                defaultPrice = parseFloat(getSelected);
                defaultofferprices = (defaultPrice * defaultOffer) / 100;
                defaultsaveprices = defaultPrice - defaultofferprices;
                $('#offerValue').text('GBP' + defaultPrice.toFixed(2));
                $('#offerPriceValue').text('GBP' + defaultsaveprices.toFixed(2));
                $('#savePriceValue').text('GBP' + defaultofferprices.toFixed(2));
            });
        } else {
            $('#totalPage').val('1 Page / 250 Words');
        }
    });
    $(".listButton").on("click", function (e) {
        e.preventDefault();
        $('.listButton').addClass('hidden');
        $('.listButton').text('SELECT');
        $('.mouseAction').removeClass('addActive');
        $('#' + this.id).removeClass('hidden');
        $('#' + this.id).text('SELECTED');
        $('#LId' + this.id).addClass('addActive');
        $('#SId' + this.id).addClass('addActive');
        var ValueGet = $('.Get' + this.id).val();
        var offer = 20;
        if (ValueGet != '') {
            offer = parseFloat(offer);
            ValueGet = parseFloat(ValueGet);
            var offerprices = (ValueGet * offer) / 100;
            var saveprices = ValueGet - offerprices;
            $('#offerValue').text('GBP' + ValueGet.toFixed(2));
            $('#offerPriceValue').text('GBP' + saveprices.toFixed(2));
            $('#savePriceValue').text('GBP' + offerprices.toFixed(2));
        }
    });
});
$(document).ready(function () {
    $("#checkboxAll").on("click", function () {
        var checkedCount = $('.checkSubjectToSend:checked').length;
        if (checkedCount == '0') {
            $('#checkboxAll').prop('checked', true);
        }
        $('.checkSubjectToSend').prop('checked', false);
        $('#sampleSearch').val('');
        var base_url = $('#base_url').val();
        var refresh = base_url + '/freesample';
        $.ajax({
            url: refresh, beforeSend: function () {
                $("#sampleLoadingHide").hide();
                $("#sampleLoading").show();
            }
        }).done(function (data) {
            $("#sampleLoadingHide").show();
            $("#sampleLoading").hide();
            $('.articles').html(data);
        }).fail(function () {
            alert('Articles could not be loaded.');
        });
        window.history.pushState("", "", refresh);
    });
    $(".checkSubjectToSend").on("click", function () {
        var totalCountOnChecked = $('.checkSubjectToSend').length;
        var countOnChecked = $('.checkSubjectToSend:checked').length;
        var sampleSearch = '';
        var base_url = $('#base_url').val();
        var burl = base_url + '/freesample';
        var checked_boxes = $('.checkSubjectToSend').length;
        var arr = getJobsChecked();
        var arrLen = arr.length;
        var furl = burl;
        var qString = '';
        sampleSearch = $('#sampleSearch').val();
        for (var i = 0; i < arr.length; i++) {
            qString += "~" + arr[i];
        }
        if (sampleSearch != '') {
            if (qString != '') {
                sampleSearch = "&search=" + sampleSearch;
            } else {
                sampleSearch = "?search=" + sampleSearch;
            }
        }
        if (qString != '' && arr.length != '0') {
            $('#checkboxAll').prop('checked', false);
            qString = qString.substring(1);
            var furl = burl + "?checksubject=" + qString + sampleSearch;
        } else {
            $('#checkboxAll').prop('checked', true);
            var furl = burl + sampleSearch;
        }
        $.ajax({
            url: furl, beforeSend: function () {
                $("#sampleLoadingHide").hide();
                $("#sampleLoading").show();
            }
        }).done(function (data) {
            $("#sampleLoadingHide").show();
            $("#sampleLoading").hide();
            $('.articles').html(data);
        }).fail(function () {
            alert('Articles could not be loaded.');
        });
        window.history.pushState("", "", furl);
    });
    $("#sampleSearchForm").validate({
        rules: {sampleSearch: "required",},
        messages: {sampleSearch: "",},
        errorElement: "em",
        errorPlacement: function (error, element) {
            error.addClass("help-block");
            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element, errorClass, validClass) {
            $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
            $(element).addClass("input-error");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
            $(element).removeClass("input-error");
        }
    });
    $(document).on('keypress', '#sampleSearch', sampleSearchFunc).on('click', '#buttonSampleSearch', sampleSearchFunc);

    function sampleSearchFunc(e) {
        if (e.which == 13 || e.type == 'click') {
            e.preventDefault();
            var checkValidation = $("#sampleSearchForm").valid();
            if (checkValidation) {
                var sampleSearch = '';
                var base_url = $('#base_url').val();
                var burl = base_url + '/freesample';
                var checked_boxes = $('.checkSubjectToSend').length;
                var arr = getJobsChecked();
                var arrLen = arr.length;
                var furl = burl;
                var qString = '';
                sampleSearch = $('#sampleSearch').val();
                for (var i = 0; i < arr.length; i++) {
                    qString += "~" + arr[i];
                }
                if (sampleSearch != '') {
                    if (qString != '') {
                        sampleSearch = "&search=" + sampleSearch;
                    } else {
                        sampleSearch = "?search=" + sampleSearch;
                    }
                }
                if (qString != '' && arr.length != '0') {
                    $('#checkboxAll').prop('checked', false);
                    qString = qString.substring(1);
                    var furl = burl + "?checksubject=" + qString + sampleSearch;
                } else {
                    $('#checkboxAll').prop('checked', true);
                    var furl = burl + sampleSearch;
                }
                $.ajax({
                    url: furl, beforeSend: function () {
                        $("#sampleLoadingHide").hide();
                        $("#sampleLoading").show();
                    }
                }).done(function (data) {
                    $("#sampleLoadingHide").show();
                    $("#sampleLoading").hide();
                    $('.articles').html(data);
                    var recordnotfound = $('.recordnotfound').html();
                    if (recordnotfound == 'Record not found') {
                        $('#checkboxAll').prop('checked', false);
                    } else {
                        $('#checkboxAll').prop('checked', false);
                    }
                }).fail(function () {
                    alert('Articles could not be loaded.');
                });
                window.history.pushState("", "", furl);
            }
        }
    }

    $(function () {
        $('body').on('click', '.pagination a', function (e) {
            e.preventDefault();
            $('#load a').css('color', '#dfecf6');
            $('#load').append('<img style="position: absolute; left: 0; top: 0; z-index: 100000;" src="/images/loading.gif" />');
            var url = $(this).attr('href');
            getArticles(url);
            window.history.pushState("", "", url);
            $('html,body').animate({scrollTop: $('#sampleData').offset().top - $('#header').outerHeight() - 30}, 500);
        });

        function getArticles(url) {
            $.ajax({
                url: url, beforeSend: function () {
                    $("#sampleLoadingHide").hide();
                    $("#sampleLoading").show();
                }
            }).done(function (data) {
                $("#sampleLoadingHide").show();
                $("#sampleLoading").hide();
                $('.articles').html(data);
            }).fail(function () {
                alert('Articles could not be loaded.');
            });
        }
    });
    $(document).on('keypress', '.txtSearchProdAssign', priceFormFunc).on('click', '#placeYourorderOnPrice', priceFormFunc);

    function priceFormFunc(e) {
        if (e.which == 13 || e.type == 'click') {
            e.preventDefault();
            var checkValidation = validationPricePage();
            if (checkValidation) {
                var WorkLevel = '';
                var base_url = $('#base_url').val();
                var verId = $('.varsionclass').attr('id');
                if (verId == 'mobileVersion') {
                    WorkLevel = $('#Work_Level').val();
                }
                if (verId == 'desktopVersion') {
                    checkWorklevel = $('.WorkLevel').is(':checked');
                    if (checkWorklevel) {
                        WorkLevel = $('.WorkLevel:checked').val();
                    }
                }
                var CSRF_TOKEN = $('meta[name="csrf_token"]').attr('content');
                var formData = new FormData($('#onPriceorderForm')[0]);
                formData.append('_token', CSRF_TOKEN);
                formData.append('Work_Level', WorkLevel);
                formData.append('Pages', $('#pagesValues').val());
                formData.append('PagesWords', $('#PagesWords').val());
                $.ajax({
                    url: base_url + '/placeyourorderonprice',
                    type: 'POST',
                    data: formData,
                    dataType: 'json',
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        if (data.satus == 1) {
                            window.location.href = base_url + '/secondstep';
                        } else {
                            if (data.status_code == 701) {
                                if (data.Work_Level) {
                                    $('#WorkLevelDiv_Error').html('<em for="Work_Level" class="error1 help-block1" style="bottom: -1.3rem;display:block;position:relative;">Please select your study level</em>');
                                }
                                if (data.Subject_Name) {
                                    $("#Subject_Name").addClass("invalid");
                                    $('#SubjectNameDiv').html('<em for="weightage"  class="error1 help-block1">Please select subject</em>');
                                }
                            } else {
                                $("#Subject_Name").removeClass("invalid");
                                $('#SubjectNameDiv').html('');
                            }
                        }
                    }
                });
            }
        }
    }

    $("#subcribeemailForm").validate({
        rules: {email: {required: true, email: true,}},
        messages: {email: {required: "", email: ""}},
        errorElement: "em",
        errorPlacement: function (error, element) {
            error.addClass("help-block");
            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element, errorClass, validClass) {
            $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
            $(element).addClass("common-input-error");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
            $(element).removeClass("common-input-error");
        }
    });
    $(document).on('keypress', '#scribeUs', emailSubscribe).on('click', '#subscribeButton', emailSubscribe);

    function emailSubscribe(e) {
        if (e.which == 13 || e.type == 'click') {
            e.preventDefault();
            $('#scribeUs').removeClass('common-input-error');
            var checkValidation = $("#subcribeemailForm").valid();
            if (checkValidation) {
                var formData = new FormData($('#subcribeemailForm')[0]);
                var base_url = $('#base_url').val();
                var CSRF_TOKEN = $('meta[name="csrf_token"]').attr('content');
                formData.append('_token', CSRF_TOKEN);
                $.ajax({
                    url: base_url + '/emailsubscribe',
                    type: 'POST',
                    data: formData,
                    dataType: 'json',
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        $('.allreadyMsg').text('');
                        if (data.status_code == '702') {
                            $('#centralModalSubscribe').modal();
                        } else {
                            if (data.status_code == '-1') {
                                $('.allreadyMsg').text(data.message);
                                $('#centralAllreadyModalSubscribe').modal();
                            } else {
                                if (data.status_code == '-2') {
                                    $('.allreadyMsg').text(data.message);
                                    $('#centralAllreadyModalSubscribe').modal();
                                } else {
                                    if (data.status_code == '701') {
                                        $('#scribeUs').addClass('input-error');
                                    } else {
                                        $('.allreadyMsg').text(data.message);
                                        $('#centralAllreadyModalSubscribe').modal();
                                    }
                                }
                            }
                        }
                    }
                });
            }
        }
    }

    $("#search404Form").validate({
        rules: {search404: {required: true}},
        messages: {search404: {required: ""}},
        errorElement: "em",
        errorPlacement: function (error, element) {
            error.addClass("help-block");
            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element, errorClass, validClass) {
            $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
            $(element).addClass("input-error");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
            $(element).removeClass("input-error");
        }
    });
    $(document).on('keypress', '#search404', pageNotFoundFun);

    function pageNotFoundFun(e) {
        if (e.which == 13 || e.type == 'click') {
            e.preventDefault();
            var checkValidation = $("#search404Form").valid();
            if (checkValidation) {
                var searchurl = $('#base_url').val();
                var searchValue = $('#search404').val();
                if (searchValue) {
                    searchurl = searchurl + '/searchresult?q=' + searchValue;
                    window.location.href = searchurl;
                }
            }
        }
    }
});
$(document).ready(function () {
    $(".btn-elegant").click(function () {
        $("#message_user").html(" ");
        $(".email").val("");
    })
});

function subscribeForm() {
    $("#message_user").html(" ");
    var base_url = $("meta[name=base_url]").attr("content");
    $.ajax({
        url: base_url + "/sample/download",
        type: "POST",
        data: $("#sendAttachmentFileForm").serialize(),
        beforeSend: function () {
            $(".loader").show();
        },
        success: function (data) {
            var response = $.parseJSON(data);
            $(".email").html(" ");
            switch (response['status_code']) {
                case 702:
                    $("input[name=email]").val(" ");
                    $("#message_user").html('<div class="alert p-relative alert-success alert-dismissable animated fadeIn mb-2"><a href="#" class="close close close-circle" data-dismiss="alert" aria-label="close"><span style="font-size: 1.3rem; font-weight: 500; color: red; line-height: 1.1;padding: 0px 5px;top:-4px;vertical-align:top"> × </span></a><p style="word-wrap: break-word;"><strong>Success!</strong>' + response['message'] + '</p></div>');
                    break;
                case 701:
                    $("#message_user").html('<div class="alert p-relative alert-warning alert-dismissable animated fadeIn mb-2"><a href="#" class="close close-circle" data-dismiss="alert" aria-label="close"><span style="font-size: 1.3rem; font-weight: 500; color: red; line-height: 1.1;padding: 0px 5px;top:-4px;vertical-align:top"> × </span></a><p style="word-wrap: break-word;"><strong>Failure!</strong>' + response['message'] + '</p></div>');
                    $(".email").html("<p class='text-danger'>" + response['email'] + "</p>");
                    break;
                case 700:
                    $("#message_user").html('<div class="alert p-relative alert-warning alert-dismissable animated fadeIn mb-2"><a href="#" class="close close-circle" data-dismiss="alert" aria-label="close"><span style="font-size: 1.3rem; font-weight: 500; color: red; line-height: 1.1;padding:0px 5px;top:-4px;vertical-align:top"> × </span></a><p style="word-wrap: break-word;"><strong>Failure!</strong>' + response['message'] + '</p></div>');
                    break;
                case 707:
                    $("#message_user").html('<div class="alert p-relative alert-danger alert-dismissable animated fadeIn mb-2"><a href="#" class="close close-circle" data-dismiss="alert" aria-label="close"><span style="font-size: 1.3rem; font-weight: 500; color: red; line-height: 1.1;padding: 0px 5px;top:-4px;vertical-align:top"> × </span></a><p style="word-wrap: break-word;"><strong>Fatal Error!</strong>' + response['message'] + '</p></div>');
                    break;
                default:
                    alert("Did not matched any case!");
            }
            $(".loader").hide();
        }
    });
}

/*$('.sendAttachmentMail').focusin(function () {
    $('#attachmentMail_Error').html('');
});*/
$("#sendAttachmentFileForm").validate({
    rules: {
        email: {
            required: {
                depends: function () {
                    $(this).val($.trim($(this).val()));
                    return true;
                }
            }, email: true, checkValidEmail: true
        }
    },
    messages: {email: {required: "Please enter email id"}},
    errorElement: "em",
    errorPlacement: function (error, element) {
        $('.attachmentMail_Error').html('');
        error.addClass("help-block");
        if (element.prop("type") === "checkbox") {
            error.insertAfter(element.parent("label"));
        } else {
            error.insertAfter(element);
        }
    },
    highlight: function (element, errorClass, validClass) {
        $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
        $(element).addClass("input-error");
        $('.attachmentMail_Error').html('');
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
        $(element).removeClass("input-error");
    }
});
$("#centralModalpID").click(function () {
    $('.sendAttachmentMail').removeClass('input-error');
    $('.sendAttachmentMail').next().remove();
    $('.sendAttachmentMail').val('');
    $('#attachmentMail_Error').html('');
});
$(document).on('keypress', '.sendAttachmentMail', sendAttachmentFileFun).on('click', '#sendAttachmentMailBtn', sendAttachmentFileFun);

function sendAttachmentFileFun(e) {
    $('#attachmentMail_Error').html('');
    if (e.which == 13 || e.type == 'click') {
        e.preventDefault();
        $('#scribeUs').removeClass('input-error');
        var checkValidation = $("#sendAttachmentFileForm").valid();
        if (checkValidation) {
            var base_url = $('#base_url').val();
            $.ajax({
                url: base_url + "/sample/download",
                type: "POST",
                data: $("#sendAttachmentFileForm").serialize(),
                success: function (response) {
                    var data = $.parseJSON(response);
                    if (data['status_code'] == '702') {
                        $('#attachmentMail_Error').html('<em for="Timezone_Id" class="text-success" style="bottom: -1.5rem">' + data['message'] + '</em>');
                        setTimeout(function () {
                            $('#attachmentMail_Error').html('');
                        }, 5000);
                    } else {
                        $('#attachmentMail_Error').html('<em for="Timezone_Id" class="error1 help-block1" style="bottom: -1.5rem">' + data['message'] + '</em>');
                    }
                }
            });
        }
    }
}

$("#stepOrderForm").validate({
    rules: {
        Email: {required: true, email: true},
        Subject_Name: {required: true},
        Due_Date: {required: true},
        Pages: {required: true}
    },
    messages: {
        Email: {required: "Please enter an email address"},
        Subject_Name: {required: "Please enter subject"},
        Due_Date: {required: "Please select date"},
        Pages: {required: "Please choose pages"}
    },
    errorElement: "em",
    errorPlacement: function (error, element) {
        error.addClass("help-block");
        if (element.prop("type") === "checkbox") {
            error.insertAfter(element.parent("label"));
        } else {
            error.insertAfter(element);
        }
    },
    highlight: function (element, errorClass, validClass) {
        $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
        $(element).addClass("input-error");
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
        $(element).removeClass("input-error");
    }
});
$("#YourorderFomBton").click(function () {
    var checkValidation = $("#stepOrderForm").valid();
    if (checkValidation) {
        return true;
    }
});

function setTimeoutErrorModal(elementId, timeOut) {
    setTimeout(function () {
        window.location.reload(true);
    }, timeOut);
}

function checkValueInarray(val) {
    var hasMatch = 0;
    for (var index = 0; index < worklevelJsonlist.length; ++index) {
        var checkequalv = worklevelJsonlist[index];
        if (checkequalv.value == val) {
            hasMatch = checkequalv.data;
            break;
        }
    }
    return hasMatch;
}