XXX = zeros(16,3);
for i = 1:3
    mass = generate(i);
    for j = 1:15
        XXX(j, i) = mass(j);
    end
    
    Y = fft(mass, 1000);
    k = 0;
    T = sqrt(log(1/0.05)*1000);
    for j = 1:1000
        if Y(j) < T
            ++k;
        end
    end
    N0 = 0.95*1000/2;
    if k > N0
        XXX(16, i) = 0;
        break;
    end
    
    d = (k - N0)/sqrt(1000*0.95*0.05/k);
    
    pvalue = erfc(abs(d)/sqrt(2));
    
    XXX(16, i) = pvalue;
end