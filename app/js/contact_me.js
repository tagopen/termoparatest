$(function() {

    $(".contactForm input, .contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            $form.find("[type=submit]").prop("disabled", true).button("loading"); //prevent submit behaviour and display preloading-------+
            // get values from FORM
            var form             = $form.find("[name=form]").attr('name'),
                name             = $form.find("[name=name]").val(),
                email            = $form.find("[name=email]").val(),
                phone            = $form.find("[name=phone]").val(),
                message          = $form.find("[name=message]").val(),
                personalID       = $.cookie("personalID"),
                switchForm       = $(".buyer__modal--inputnotexist").length,
                qty              = $form.find("[name=qty]").val(),
                delivery         = $form.find("[name=delivery]").val(),
                product          = $form.find("[name=product]").val(),
                payment          = new Array(),
                question         = new Array();

            // Generate random value
            var ID = function () {
              return "_" + Math.random().toString(36).substr(2, 9);
            };

            var date = new Date();
            var minutes = 5;
            date.setTime(date.getTime() + (minutes * 60 * 1000));

            if (!(personalID)) {
                personalID = ID();
                $.cookie("personalID", personalID, { expires: date });
            }

            if (name === undefined) {
                $.cookie("existName", "name", { expires: date });
            }
            if (phone === undefined) {
                $.cookie("existPhone", "phone", { expires: date });
            }
            if (email === undefined) {
                $.cookie("existEmail", "email", { expires: date });
            }

            $("[name^=\"question\"]:checked").each(function() {
                if ($(this).prop("checked")) {
                    var $question       = $(this).parents(".question"),
                        questionHeding  = $question.find(".question__heading").text(),
                        currQuestion    = $question.find(".question__current").text();
                        radioText       = $(this).siblings(".radio-btn__box").find(".radio-btn__text").text();
                    question.push("Вопрос " + $.trim(currQuestion) + ". " + $.trim(questionHeding) + "\n" + "Ответ: " + $.trim(radioText));
                }
            });

            $('[name^=\"payment\"]:checked').each(function() {
                if ($(this).prop("checked")) {
                    var radioText = $(this).siblings(".radio-btn__box").find(".radio-btn__text").text();
                    payment.push($.trim(radioText));
                }
            });+

            $.ajax({
                url: "././mail/mail.php",
                type: "POST",
                data: {
                    form: form,
                    name: name,
                    email: email,
                    phone: phone,
                    personalID: personalID,
                    switchForm: switchForm,
                    message: message,
                    qty: qty,
                    delivery: delivery,
                    product: product,
                    payment: payment,
                    question: question
                },
                cache: false,
                success: function() {
                    if (!(switchForm)) {
                        document.location.href = "./success.html";
                    } else {
                        $.removeCookie("personalID");
                        document.location.href = "http://newl.com.ua/files/sovet_po_vblboru_obogrevatelei.pdf";
                    }
                    // Success message
                    $form.find(".success").html("<div class=\"alert alert-success\">");
                    $form.find(".success > .alert-success").html("<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;")
                        .append("</button>");
                    $form.find(".success > .alert-success")
                        .append("<strong>Ваше сообщение успешно отправлено. В ближайшее время наши менеджеры свяжутся с вами! </strong>");
                    $form.find(".success > .alert-success")
                        .append("</div>");

                    // remove prevent submit behaviour and disable preloading
                    $form.find("[type=submit]").prop("disabled", false).button("reset");  

                    //clear all fields
                    $form.trigger("reset");
                },
                error: function() {
                    // Fail message
                    $form.find(".success").html("<div class=\"alert alert-danger\">");
                    $form.find(".success > .alert-danger").html("<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-hidden=\"true\">&times;")
                        .append("</button>");
                    $form.find(".success > .alert-danger").append("<strong>Приносим свои извинения, но наш почтовый сервер времено не работает. Попробуйте, отправить сообщение еще раз и сообщите нам о проблеме!");
                    $form.find(".success > .alert-danger").append("</div>");

                    // remove prevent submit behaviour and disable preloading
                    $form.find("[type=submit]").prop("disabled", false).button("reset"); 

                    //clear all fields
                    $form.trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$("#name").focus(function() {
    $(".success").html("");
});
