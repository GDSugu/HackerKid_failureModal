const gulp = require('gulp');
const del = require('del');
const fs = require("fs");
const readlineSync = require('readline-sync');

const exitError = () => {
  process.exit(1);
};

const cleanCheckDev = (complete) => {
  console.log("cleaning dev and live repo");
  const deletedPaths = del.sync([
    '../hackerkid-v2-frontend-dev/*',
    '../hackerkid-v2-frontend-dev/.htaccess',
    '!../hackerkid-v2-frontend-dev/.git',
    '!../hackerkid-v2-frontend-dev/.gitignore',
  ], {
    force: true,
    dryRun: true,
  });
  console.log('Files and directories that would be deleted:\n', deletedPaths.join('\n'));
  complete();
};

const cleanDev = () => {
  console.log("No turning back now");
  const deletedPaths = del.sync([
    '../hackerkid-v2-frontend-dev/*',
    '../hackerkid-v2-frontend-dev/.htaccess',
    '!../hackerkid-v2-frontend-dev/.git',
    '!../hackerkid-v2-frontend-dev/.gitignore',
  ], {
    force: true,
  });
};

const copyDev = (complete) => {
  console.log('Copying files from dist/ to ../hackerkid-v2-frontend-dev/');
  gulp.src(['dist/**/*', 'dist/.htaccess'])
    .pipe(gulp.dest('../hackerkid-v2-frontend-dev/'))
    .on('end', () => {
      complete();
    });
};

const confirmationDev = (complete) => {
  const confirmation = readlineSync.question('The above list of files will be deleted. Are you sure want to continue? (y/n):');
  if(confirmation === 'y'){
    cleanDev();
    copyDev(complete);
  }
  else{
    console.log('Task aborted');
    exitError();
  }
};

const cleanCheckLive = (complete) => {
  console.log("cleaning dev and live repo");
  const deletedPaths = del.sync([
    '../hackerkid-v2-frontend-live/*',
    '../hackerkid-v2-frontend-live/.htaccess',
    '!../hackerkid-v2-frontend-live/.git',
    '!../hackerkid-v2-frontend-live/.gitignore',
  ], {
    force: true,
    dryRun: true,
  });
  console.log('Files and directories that would be deleted:\n', deletedPaths.join('\n'));
  complete();
};

const cleanLive = () => {
  console.log("No turning back now");
  const deletedPaths = del.sync([
    '../hackerkid-v2-frontend-live/*',
    '../hackerkid-v2-frontend-live/.htaccess',
    '!../hackerkid-v2-frontend-live/.git',
    '!../hackerkid-v2-frontend-live/.gitignore',
  ], {
    force: true,
  });
};

const copyLive = (complete) => {
  console.log('Copying files from dist/ to ../hackerkid-v2-frontend-live/');
  gulp.src(['dist/**/*', 'dist/.htaccess'])
    .pipe(gulp.dest('../hackerkid-v2-frontend-live/'))
    .on('end', () => {
      complete();
    });
};

const confirmationLive = (complete) => {
  const confirmation = readlineSync.question('The above list of files will be deleted. Are you sure want to continue? (y/n):');
  if(confirmation === 'y'){
    cleanLive();
    copyLive(complete);
  }
  else{
    console.log('Task aborted');
    exitError();
  }
};

exports.buildDev = gulp.series(cleanCheckDev, confirmationDev);
exports.buildLive = gulp.series(cleanCheckLive, confirmationLive);
