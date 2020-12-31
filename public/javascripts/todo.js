$(function() {

    // ［削除］ボタンクリックで削除
    $('button[name="delete"]').click(function() {

        // Noを取得
        var no = $(this).attr("id");
        const message = 'No.' + no + ' を削除してよろしいですか？';

        if (!confirm(message)) {
            // 削除しない場合
            return false;
        } else {
            // 削除する場合
        }
    })

    $('button[name="check"]').click(function() {

        // idを取得
        var id = $(this).attr("id");

        $.ajax({
            async: false,
            url: '/TodoList/Check',
            type: 'post',
            data: { "seq": id },
            // dataType: 'json'
            dataType: 'text'
        }).done(function(res) {
            // 成功時
            window.location.reload();

        }).fail(function(xhr, status, error) {
            // 失敗時
            alert(status);
            console.log('xhr:' + xhr);
            console.log('status:' + status);
            console.log('error:' + error);
        });
    })
});