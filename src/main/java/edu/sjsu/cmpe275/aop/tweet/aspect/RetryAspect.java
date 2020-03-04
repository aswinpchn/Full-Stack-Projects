package edu.sjsu.cmpe275.aop.tweet.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.annotation.Order;
import org.aspectj.lang.annotation.Around;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

@Aspect
@Order(1)
public class RetryAspect {
  /***
   * Following is a dummy implementation of this aspect.
   * You are expected to provide an actual implementation based on the requirements, including adding/removing advices as needed.
   * @throws Throwable
   */

  private static int MAX_TRIES = 4;

  @Around("execution(public void edu.sjsu.cmpe275.aop.tweet.TweetService.*(..))")
  public void dummyAdviceOne(ProceedingJoinPoint joinPoint)
          throws IOException, IllegalArgumentException, UnsupportedOperationException {
    System.out.printf("Prior to the execution of the method %s in RetryAspect \n", joinPoint.getSignature().getName());

    for (int i = 1; i <= MAX_TRIES; i++) {
      try {
        Object a = joinPoint.proceed();
        System.out.println("Seems there is no Network error (IOException)");
        break;
      }
      catch (IOException e) {
        e.printStackTrace();
        System.out.println("  Throttled during try #" + i);
        if(i == 4) {
          System.out.printf("Aborted the executuion of the metohd %s in RetryAspect due to IOException 3 times.\n", joinPoint.getSignature().getName());
          throw new IOException();
        }
      } catch (IllegalArgumentException e) {
        e.printStackTrace();
        System.out.printf("Finished the execution of the method %s in RetryAspect with IllegalArgumentException\n", joinPoint.getSignature().getName());
        throw new IllegalArgumentException();
      } catch(UnsupportedOperationException e) {
        e.printStackTrace();
        System.out.printf("Finished the execution of the method %s in RetryAspect with UnsupportedOperationException\n", joinPoint.getSignature().getName());
        throw new UnsupportedEncodingException();
      } catch (Throwable throwable) {
        System.out.println("---------------- Came into throwable -------------------");
        throwable.printStackTrace();
        break;
      }
    }

    System.out.printf("Finished the execution of the method %s in RetryAspect\n", joinPoint.getSignature().getName());
  }

}
