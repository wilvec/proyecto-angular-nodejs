'use strict'

var Project = require('../models/project');
var fs = require('fs');
var path = require('path');
var controller = {
    home: function (req, res) {
        return res.status(200).send({
            message: 'Soy la home'
        });
    },

    test: function (req, res) {
        return response.status(200).send({
            message: 'Soy el método o acción test del controlador de project'
        });
    },

    saveProject: function (req, res) {
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = params.image;

        project.save((err, projectStored) => {
            if (err) return res.status(500).send({ message: 'Error al guardar el documento.' });

            if (!projectStored) return res.status(404).send({ message: 'No se ha podido guardar el documento.' });

            return res.status(200).send({ project: projectStored });
        });
    },

    getProject: function (req, res) {
        var projectId = req.params.id;
        Project.findById(projectId, (err, project) => {
            if (err) return res.status(500).send({ message: 'Error: error al devolver el proyecto' });
            if (!project) return res.status(404).send({ message: 'El proyecto no existe' });
            return res.status(200).send({ project });
        });
    },

    getProjects: function (req, res) {
        Project.find({}).exec((err, projects) => {
            if (err) return res.status(500).send({ message: 'Error: error al devolver el proyecto' });
            if (!projects) return res.status(404).send({ message: 'El proyecto no existe' });
            return res.status(200).send({ projects });
        });
    },

    updateProject: function (req, res) {
        var projectId = req.params.id;
        var update = req.body;

        Project.findOneAndUpdate(projectId, update, { new: true }, (err, projectUpdated) => {
            if (err) return res.status(500).send({ message: 'Error: error al devolver el proyecto' });
            if (!projectUpdated) return res.status(404).send({ message: 'El proyecto no existe' });
            return res.status(200).send({ projects: projectUpdated });
        });
    },

    deleteProject: function (req, res) {
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndRemove(projectId, (err, projectDeleted) => {
            if (err) return res.status(500).send({ message: 'Error: error al devolver el proyecto' });
            if (!projectDeleted) return res.status(404).send({ message: 'El proyecto no existe' });
            return res.status(200).send({ projects: projectDeleted });
        });
    },

    uploadImage: function (req, res) {
        var projectId = req.params.id;
        var fileName = 'Imagen no subida...';
        if (req.files) {
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var extFile = extSplit[1];
            console.log(extFile.toUpperCase());
            if (extFile.toUpperCase() == 'PNG' || extFile.toUpperCase() == 'JPG' ||
                extFile.toUpperCase() == 'GIF' || extFile.toUpperCase() == 'JPEG') {

                Project.findByIdAndUpdate(projectId, { image: fileName }, { new: true }, (err, projectUpdated) => {

                    if (err) {
                        return res.status(500).send({
                            message: err
                        });
                    }

                    if (!projectUpdated) {
                        return res.status(500).send({
                            message: 'Projecto con id: ' + projectId + ' No existe y no se asignó la imagen'
                        });
                    }

                    return res.status(200).send({
                        message: projectUpdated
                    });

                });

            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({ message: 'La extensión del archivo no es válida (Solo png, gif, jpg, jpeg' });
                });
            }

        } else {
            return res.status(500).send({
                message: fileName
            });
        }
    },

    getImageFile: function (req, res) {
        var file = req.params.file;
        var path_file = './uploads/' + file;
        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({
                    message: "No existe la imagen"
                });
            }
        });
    }
};

module.exports = controller;