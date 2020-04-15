const Model = require("../models/product.model");

exports.create = (req, res) => {
  try {
    let Pill = new Model({
      sodangky: req.body.sodangky,
      tenthuoc: req.body.tenthuoc,
      phanloai: req.body.phanloai,
      tuoitho: req.body.tuoitho,
      hoatchat: req.body.hoatchat,
      dangbaoche: req.body.dangbaoche,
      quycach: req.body.quycach,
      ctysx: req.body.ctysx,
      tieuchuan: req.body.tieuchuan,
      ctydk: req.body.ctydk,
      ngaykekhai: req.body.ngaykekhai,
      donvi: req.body.donvi,
      giakekhai: req.body.giakekhai,
      dvt: req.body.dvt,
      image: req.file.originalname,
    });

    Pill.save(function (err) {
      if (err) {
        console.log(err);
        return;
      } else {
        res.redirect("/danh-sach-thuoc");
      }
    });
  } catch (error) {
    let Pill = new Model({
      sodangky: req.body.sodangky,
      tenthuoc: req.body.tenthuoc,
      phanloai: req.body.phanloai,
      tuoitho: req.body.tuoitho,
      hoatchat: req.body.hoatchat,
      dangbaoche: req.body.dangbaoche,
      quycach: req.body.quycach,
      ctysx: req.body.ctysx,
      tieuchuan: req.body.tieuchuan,
      ctydk: req.body.ctydk,
      ngaykekhai: req.body.ngaykekhai,
      donvi: req.body.donvi,
      giakekhai: req.body.giakekhai,
      dvt: req.body.dvt,
    });

    Pill.save(function (err) {
      if (err) {
        console.log(err);
        return;
      } else {
        res.redirect("/danh-sach-thuoc");
      }
    });
  }
};
exports.delete = (req, res) => {
  Model.deleteOne({ _id: req.params.id }, (err, data) => {
    if (!err) {
      res.redirect("/danh-sach-thuoc");
    } else {
      console.log(err);
    }
  });
};

exports.getAll = (req, res) =>
  Model.find({})
    .lean()
    .exec((error, data) => {
      let newData = data.map((item, index) => ({
        ...item,
        noNum: index,
      }));
      res.render("product", { List: newData });
      if (error) {
        log(error);
      }
    });

exports.getInfoProductById = (req, res) => {
  Model.findById(req.params.id)
    .lean()
    .exec((err, data) => {
      if (!err) {
        res.render("editProduct", { Model: data });
      }
    });
};
exports.getDetailsProductById = (req, res) => {
  Model.findById(req.params.id)
    .lean()
    .exec((err, data) => {
      if (!err) {
        res.render("detailsProduct", { Model: data });
      }
    });
};

exports.editProductById = async (req, res) => {
  try {
    await Model.updateOne(
      { _id: req.body._id },
      {
        $set: {
          sodangky: req.body.sodangky,
          tenthuoc: req.body.tenthuoc,
          phanloai: req.body.phanloai,
          tuoitho: req.body.tuoitho,
          hoatchat: req.body.hoatchat,
          dangbaoche: req.body.dangbaoche,
          quycach: req.body.quycach,
          ctysx: req.body.ctysx,
          tieuchuan: req.body.tieuchuan,
          ctydk: req.body.ctydk,
          ngaykekhai: req.body.ngaykekhai,
          donvi: req.body.donvi,
          giakekhai: req.body.giakekhai,
          dvt: req.body.dvt,
          image: req.file.originalname,
        },
      },
      (err, doc) => {
        if (!err) {
          res.redirect("/danh-sach-thuoc");
        } else {
          console.log("Edit Failed");
        }
      }
    );
  } catch (error) {
    await Model.updateOne(
      { _id: req.body._id },
      {
        $set: {
          sodangky: req.body.sodangky,
          tenthuoc: req.body.tenthuoc,
          phanloai: req.body.phanloai,
          tuoitho: req.body.tuoitho,
          hoatchat: req.body.hoatchat,
          dangbaoche: req.body.dangbaoche,
          quycach: req.body.quycach,
          ctysx: req.body.ctysx,
          tieuchuan: req.body.tieuchuan,
          ctydk: req.body.ctydk,
          ngaykekhai: req.body.ngaykekhai,
          donvi: req.body.donvi,
          giakekhai: req.body.giakekhai,
          dvt: req.body.dvt,
          image: req.body.urlimage,
        },
      },
      (err, doc) => {
        if (!err) {
          res.redirect("/danh-sach-thuoc");
        } else {
          console.log("Edit Failed");
        }
      }
    );
  }
};
