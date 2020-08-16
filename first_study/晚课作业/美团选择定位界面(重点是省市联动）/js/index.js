/**
 * 获取省市信息
 */
$.ajax({
    url: "http://127.0.0.1:5500/%E6%99%9A%E8%AF%BE%E4%BD%9C%E4%B8%9A/%E7%BE%8E%E5%9B%A2%E9%80%89%E6%8B%A9%E5%AE%9A%E4%BD%8D%E7%95%8C%E9%9D%A2(%E9%87%8D%E7%82%B9%E6%98%AF%E7%9C%81%E5%B8%82%E8%81%94%E5%8A%A8%EF%BC%89/js/data.json",
    type: "GET",
    dataType: "json",
    data : null,
    async : false,
    success: (data) => {
        /* linkage */
        renderLinkage($('.provinceLists'),data);
        linkageEvent(data);
        renderDic (data);
        fakeSearch();
    }
})