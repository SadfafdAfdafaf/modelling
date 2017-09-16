function [XXX] = wort_table()
XXX = zeros(17,3);
buf = [4, 7, 10];
for i = 1:3
    mass = generate(i);
    for j = 1:15
        XXX(j, i) = mass(j);
    end
    p = [];
    for k = 1:1000
        sn = de2bi(mass(k), buf(i));
        p = cat(2, p, sn);
    end
    
    ass = 0;
    for k = 1:length(p)
        if p(k) == 1
            p(k) = 1;
            ass = ass + 1;
        else
            p(k) = -1;
            ass = ass - 1;
        end
    end
        
    k = length(p)/2 - 1;
    Y = abs(fft(p, k));
    k = 0;
    T = sqrt(log(1/0.05)*length(p));
    for j = 1:length(Y)
        if Y(j) < T
            k = k + 1;
        end
    end
    N0 = 0.95*length(p)/2;
        
    d = round(k - N0)/sqrt(length(p)*0.95*0.05/k);
    
    pvalue = erfc(abs(d)/sqrt(2));

    XXX(16, i) = pvalue;

%     if k > N0
%         XXX(16, i) = 0;
%     end
    
    pvalue = erfc(abs(ass)/sqrt(length(p))/sqrt(2));
    XXX(17, i) = pvalue;
    
%     figure
%     hold on;
%     axis('equal');
%     k = 1:1:(length(p)/2 - 1);
%     plot(k, Y, 'r-');
%     hold off;
	p=[];

end
return;
end