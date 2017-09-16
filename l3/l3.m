close all;

fileid=fopen('1.txt');
[x, count]=fscanf(fileid, '%f');
X = sort(x);
fclose(fileid);

sigma = 1;
mu = 0;
Y = -10:0.1:10;
[MX, DX] = normstat(mu, sigma);
f = normpdf(Y, mu, sigma);
g = normcdf(Y, mu, sigma);

figure
title(['��������� ����������� ������������� MX =' num2str(MX), ' DX =' num2str(DX), ' sigma ='  num2str(sigma)]);
hold on;
plot(Y, f, '-oy');
hold off;

figure
title(['������� ����������� ������������� MX =' num2str(MX), ' DX =' num2str(DX), ' sigma ='  num2str(sigma)]);
hold on;
plot(Y, g, '-ob'); 
hold off;

a = -1;
b = 2;
k = unifpdf(Y, a, b);
j = unifcdf(Y, a, b);
[mx, dx] = unifstat(a, b);
sig = sqrt(dx);

figure
title(['��������� ������������ ������������ ������������� MX =' num2str(mx), ' DX =' num2str(dx), ' sigma ='  num2str(sig)]);
hold on;
plot(Y, k, '-rO'); 
hold off;

figure
title(['������������������ ������������ ������������� MX =' num2str(mx), ' DX =' num2str(dx), ' sigma ='  num2str(sig)]);
hold on;
plot(Y, j, '-gO');
hold off;